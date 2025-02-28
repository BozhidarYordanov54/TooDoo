using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TooDoo.Core.Models.Methods;
using TooDoo.Core.Models.User;
using TooDoo.Core.Services.Contracts;
using TooDoo.Infrastructure.Data.Models;

namespace TooDoo.Core.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<User> _userManager;

        private const string JWT_SECRET = "ForTheLoveOfGodStoreAndLoadThisSecurely"; // TODO: Move to appsettings.json
        private const int ACCESS_TOKEN_EXPIRY_MINUTES = 15;

        public AuthenticationService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// Logs in a user and generates a JWT token
        /// </summary>
        public async Task<MethodResponse> Login(UserLoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email ?? "")
                    ?? await _userManager.FindByNameAsync(model.UserName ?? "");

            if (user == null)
                return new MethodResponse(false, "User does not exist", "api/authentication/login");

            bool passwordMatch = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordMatch)
                return new MethodResponse(false, "Password is incorrect", "api/authentication/login");

            string accessToken = GenerateAccessToken(user);
            string refreshToken = GenerateRefreshToken();

            return new MethodResponse(true, accessToken, refreshToken);
        }

        /// <summary>
        /// Registers a new user
        /// </summary>
        public async Task<MethodResponse> Register(UserRegisterModel model)
        {
            if (await UserExists(model.Email, model.UserName))
                throw new Exception("User already exists");

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

            return new MethodResponse(true, "Succesfull registration", "api/authentication/login");
        }

        /// <summary>
        /// Refreshes the JWT token using the refresh token
        /// </summary>
        public async Task<MethodResponse> RefreshToken(UserRefreshTokenModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email ?? "") ?? 
                await _userManager.FindByNameAsync(model.Email ?? "");

            if (user == null)
                return new MethodResponse(false, "User does not exist", "api/authentication/login");

            string newAccessToken = GenerateAccessToken(user);
            string newRefreshToken = GenerateRefreshToken();

            return new MethodResponse(true, newAccessToken, newRefreshToken);
        }

        /// <summary>
        /// Checks if a user exists by email or username
        /// </summary>
        private async Task<bool> UserExists(string email, string userName)
        {
            return await _userManager.FindByEmailAsync(email) != null ||
                    await _userManager.FindByNameAsync(userName) != null;
        }

        /// <summary>
        /// Generates an access token (JWT)
        /// </summary>
        private string GenerateAccessToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(JWT_SECRET);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Sub, user.Email ?? string.Empty),
                new(JwtRegisteredClaimNames.Email, user.UserName ?? string.Empty),
                new("UserId", user.Id)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(ACCESS_TOKEN_EXPIRY_MINUTES),
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
    }
}
