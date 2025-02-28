using TooDoo.Core.Models.Methods;
using TooDoo.Core.Models.User;

namespace TooDoo.Core.Contracts
{
    public interface IUserProfileService
    {
        Task<UserProfileModel> GetUserProfileDetais(string userId);
        Task<MethodResponse> UpdateEmail(UserProfileModel model);
        Task<MethodResponse> UpdatePassword(UserProfileModel model);
        Task SendConfirmationEmail(string userId);
        Task<MethodResponse> ConfirmEmail(string userId, string token);
    }
}