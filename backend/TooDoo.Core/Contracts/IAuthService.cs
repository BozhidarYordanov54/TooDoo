using Microsoft.AspNetCore.Http;
using TooDoo.Core.Models.Auth;
using TooDoo.Core.Models.Methods;
using TooDoo.Core.Models.User;

namespace TooDoo.Core.Services.Contracts
{
    public interface IAuthService
    {
        Task<LoginResponse> Login(UserLoginModel model);
        Task<MethodResponse> Register(UserRegisterModel model);
        Task Logout(HttpRequest request, HttpResponse response);
        Task<LoginResponse> RefreshToken(HttpRequest request, HttpResponse response);
        Task SetAuthCookies(HttpResponse response, string accessToken, string refreshToken);
    }
}