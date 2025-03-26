using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TooDoo.Core.Models.Methods;
using TooDoo.Core.Models.User;
using TooDoo.Core.Services.Contracts;
using TooDoo.Infrastructure.Data.Models;
using Microsoft.Extensions.Logging;
using TooDoo.Core.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace TooDoo.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthService> _logger;

        private readonly string _jwtSecret;
        private readonly int _accessTokenExpiryMinutes;

        public AuthService(UserManager<User> userManager, IConfiguration configuration, ILogger<AuthService> logger)
        {
            _userManager = userManager;
            _configuration = configuration;
            _logger = logger;

            _jwtSecret = _configuration["JwtSettings:Secret"] ?? throw new ArgumentNullException("JWT Key not found");
            _accessTokenExpiryMinutes = int.Parse(_configuration["JwtSettings:AccessTokenExpiryMinutes"] ?? "30");
        }

        /// <summary>
        /// Logs in a user and generates a JWT token
        /// </summary>
        public async Task<LoginResponse> Login(UserLoginModel model)
        {
            if (model.UserName == null)
            {
                return new LoginResponse("Invalid password or email/username", false);
            }

            var user = await FindByUserName(model.UserName);

            if (user == null)
            {
                return new LoginResponse("Invalid password or email/username", false);
            }

            bool passwordMatch = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordMatch)
            {
                return new LoginResponse("Invalid password or email/username", false);
            }

            string accessToken = GenerateAccessToken(user);
            string refreshToken = GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddHours(12);
            await _userManager.UpdateAsync(user);

            _logger.LogInformation("User {UserName} logged in successfully", user.UserName);
            return new LoginResponse(user.UserName, accessToken, refreshToken, "Successful login", true);
        }

        /// <summary>
        /// Registers a new user
        /// </summary>
        public async Task<MethodResponse> Register(UserRegisterModel model)
        {
            if (await UserExists(model.UserName))
                return new MethodResponse(false, "User already exists", "api/authentication/register");

            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                UserName = model.UserName
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                string errors = string.Join(", ", result.Errors.Select(e => e.Description));
                return new MethodResponse(false, errors, "api/authentication/register");
            }

            _logger.LogInformation("User {UserName} registered successfully", user.UserName);

            return new MethodResponse(true, "Successful registration", "api/authentication/login");
        }

        /// <summary>
        /// Refreshes the JWT token using the refresh token
        /// </summary>
        public async Task<LoginResponse> RefreshToken(HttpRequest request, HttpResponse response)
        {
            string refreshToken = request.Cookies["RefreshToken"] ?? string.Empty;
            if (!string.IsNullOrEmpty(refreshToken))
            {
                var user = await FindByToken(refreshToken);

                DateTime tokenExpiration = user.RefreshTokenExpiry;

                if (await IsRefreshTokenValid(tokenExpiration))
                {
                    string newToken = GenerateAccessToken(user);
                    return new LoginResponse("Token refreshed", newToken, refreshToken, "", true);
                }
            }
            return new LoginResponse();
        }

        public Task SetAuthCookies(HttpResponse response, string accessToken, string refreshToken)
        {
            response.Cookies.Append("AccessToken", accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(_accessTokenExpiryMinutes)
            });

            response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(12)
            });

            return Task.CompletedTask;
        }

        public async Task Logout(HttpRequest request, HttpResponse response)
        {
            string refreshToken = request.Cookies["RefreshToken"] ?? string.Empty;

            if (!string.IsNullOrEmpty(refreshToken))
            {
                var user = await FindByToken(refreshToken);
                if(user != null)
                {
                    user.RefreshToken = null;
                    user.RefreshTokenExpiry = new DateTime();
                    await _userManager.UpdateAsync(user);
                }
            }

            response.Cookies.Delete("AccessToken");
            response.Cookies.Delete("RefreshToken");
        }

        private string GenerateAccessToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSecret);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Email, user.UserName ?? string.Empty),
                new Claim(ClaimTypes.NameIdentifier, user.Id ?? string.Empty),
                new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddSeconds(20),
                NotBefore = DateTime.UtcNow,
                Issuer = "https://localhost:5058",
                Audience = "https://localhost:5058",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken() => Convert.ToBase64String(Guid.NewGuid().ToByteArray());

        private async Task<bool> UserExists(string userName) => await _userManager.FindByNameAsync(userName) != null;

        private async Task<User?> FindByUserName(string userName) => await _userManager.FindByNameAsync(userName);
        private async Task<User?> FindByToken(string refreshToken) => await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

        private async Task<bool> IsRefreshTokenValid(DateTime refreshTokenExpiry) => refreshTokenExpiry > DateTime.UtcNow;

    }
}
