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

namespace TooDoo.Core.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthenticationService> _logger;

        private readonly string _jwtSecret;
        private readonly int _accessTokenExpiryMinutes;

        public AuthenticationService(UserManager<User> userManager, IConfiguration configuration, ILogger<AuthenticationService> logger)
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
        public async Task<MethodResponse> Login(UserLoginModel model)
        {
            var user = await FindUserByEmailOrUsername(model.Email, model.UserName);
            if (user == null)
                return new MethodResponse(false, "User does not exist", "api/authentication/login");

            bool passwordMatch = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordMatch)
            {
                return new MethodResponse(false, "Password is incorrect", "api/authentication/login");
            }

            string accessToken = GenerateAccessToken(user);
            string refreshToken = GenerateRefreshToken();

            _logger.LogInformation("User {UserName} logged in successfully", user.UserName);

            return new MethodResponse(true, accessToken, refreshToken);
        }

        /// <summary>
        /// Registers a new user
        /// </summary>
        public async Task<MethodResponse> Register(UserRegisterModel model)
        {
            if (await UserExists(model.Email, model.UserName))
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
        public async Task<MethodResponse> RefreshToken(UserRefreshTokenModel model)
        {
            var user = await FindUserByEmailOrUsername(model.Email, model.Email);
            if (user == null)
                return new MethodResponse(false, "User does not exist", "api/authentication/login");

            string newAccessToken = GenerateAccessToken(user);
            string newRefreshToken = GenerateRefreshToken();

            _logger.LogInformation("User {UserName} refreshed tokens successfully", user.UserName);

            return new MethodResponse(true, newAccessToken, newRefreshToken);
        }

        
        /// <summary>
        /// Generates an access token (JWT)
        /// </summary>
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
                Expires = DateTime.UtcNow.AddMinutes(_accessTokenExpiryMinutes),
                Issuer = "https://toodoo.com",
                Audience = "https://toodoo.com",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// Generates a refresh token
        /// </summary>
        private string GenerateRefreshToken()
        {
            return Convert.ToBase64String(Guid.NewGuid().ToByteArray());
        }

        /// <summary>
        /// Checks if a user exists by email or username
        /// </summary>
        private async Task<bool> UserExists(string email, string userName) => await _userManager.FindByEmailAsync(email) != null ||
                                                                            await _userManager.FindByNameAsync(userName) != null;

        /// <summary>
        /// Helper method to find a user by email or username
        /// </summary>
        private async Task<User> FindUserByEmailOrUsername(string email, string userName) => await _userManager.FindByEmailAsync(email) ?? await _userManager.FindByNameAsync(userName);
    }
}
