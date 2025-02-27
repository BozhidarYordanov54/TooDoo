namespace TooDoo.Core.Services.Contracts
{
    public interface IAuthenticationService
    {
        Task<string> Authenticate(string email, string password);
        Task<string> Register(string email, string password, string? returnUrl = null);
    }
}