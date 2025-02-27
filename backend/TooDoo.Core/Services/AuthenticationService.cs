using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
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

        public Task<string> Authenticate(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<string> Register(string email, string password, string? returnUrl = null)
        {
            bool userExists = await UserExists(email);

            if (userExists == true)
            {
                throw new Exception("User already exists");
            }

            User user = new User();
            user.FirstName = "Test";
            user.LastName = "User";
            user.Email = email;
            user.UserName = email;

            await _userManager.CreateAsync(user, password);


            return GenerateToken(email);
        }

        private async Task<bool> UserExists(string email)
        {
            //* This is a simple check to see if a user with the given email exists
            //*
            return await _userManager.FindByEmailAsync(email) != null;
        }

        private string GenerateToken(string email)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = "ForTheLoveOfGodStoreAndLoadThisSecurely"u8.ToArray();

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