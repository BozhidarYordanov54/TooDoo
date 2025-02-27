using TooDoo.Core.Models.Methods;
using TooDoo.Core.Models.User;

namespace TooDoo.Core.Services.Contracts
{
    public interface IAuthenticationService
    {
        Task<MethodResponse> Login(UserLoginModel model, string? returnUrl = null);
        Task<string> Register(UserRegisterModel model, string? returnUrl = null);
    }
}