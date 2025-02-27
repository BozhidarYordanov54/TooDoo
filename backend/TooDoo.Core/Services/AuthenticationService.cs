using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
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

        public AuthenticationService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<MethodResponse> Login(UserLoginModel model, string? returnUrl = null)
        {
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.UserName))
            {
                return new MethodResponse(false, "Email or username is required", "api/authentication/login", null, null);
            }

            User? user = await _userManager.FindByEmailAsync(model.Email) ?? await _userManager.FindByNameAsync(model.UserName);

            if (UserExists(model.Email, model.UserName).Result == false)
            {
                return new MethodResponse(false, "User does not exist", "api/authentication/login", null, null);
            }

            bool passwordMatch = await _userManager.CheckPasswordAsync(user, model.Password);

            if (passwordMatch == false)
            {
                return new MethodResponse(false, "Password is incorrect", "api/authentication/login", null, null);
            }

            return new MethodResponse(GenerateToken(model.Email));
        }

        public async Task<string> Register(UserRegisterModel model, string? returnUrl = null)
        {
            bool userExists = await UserExists(model.Email, model.UserName);

            if (userExists == true)
            {
                throw new Exception("User already exists");
            }

            User user = new User();
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.UserName = model.UserName;

            await _userManager.CreateAsync(user, model.Password);

            return GenerateToken(model.Email);
        }

        private async Task<bool> UserExists(string email, string userName)
        {
            //* This is a simple check to see if a user with the given email exists
            return await _userManager.FindByEmailAsync(email) != null ||
                    await _userManager.FindByNameAsync(userName) != null;
        }

        private string GenerateToken(string email)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.UTF8.GetBytes("ForTheLoveOfGodStoreAndLoadThisSecurely");

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Sub, email),
                new(JwtRegisteredClaimNames.Email, email),
            };

            var tokenDescriptopr = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(60),
                Issuer = "https://toodoo.com",
                Audience = "https://toodoo.com",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptopr);

            return tokenHandler.WriteToken(token);
        }
    }
}