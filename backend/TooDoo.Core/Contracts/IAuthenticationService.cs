using TooDoo.Core.Models.User;

namespace TooDoo.Core.Services.Contracts
{
    public interface IAuthenticationService
    {
        Task<string> Authenticate(string email, string password);
        Task<string> Register(UserRegisterModel model, string? returnUrl = null);
    }
}