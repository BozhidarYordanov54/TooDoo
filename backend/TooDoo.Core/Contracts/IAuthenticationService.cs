using Microsoft.AspNetCore.Http;
using TooDoo.Core.Models.Auth;
using TooDoo.Core.Models.Methods;
using TooDoo.Core.Models.User;

namespace TooDoo.Core.Services.Contracts
{
    public interface IAuthenticationService
    {
        Task<LoginResponse> Login(UserLoginModel model);
        Task<MethodResponse> Register(UserRegisterModel model);
        Task<LoginResponse> RefreshToken(UserRefreshTokenModel model);
    }
}