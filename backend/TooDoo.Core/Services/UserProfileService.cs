using Microsoft.AspNetCore.Identity;
using TooDoo.Core.Contracts;
using TooDoo.Core.Models.Methods;
using TooDoo.Core.Models.User;
using TooDoo.Infrastructure.Common;
using TooDoo.Infrastructure.Data.Models;
using Task = System.Threading.Tasks.Task;

namespace TooDoo.Core.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IRepository _repository;
        private readonly UserManager<User> _userManager;

        public UserProfileService(IRepository repository, UserManager<User> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        public Task<MethodResponse> ConfirmEmail(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<UserProfileModel> GetUserProfileDetais(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return new UserProfileModel
                {
                    IsSuccess = false,
                    Message = "User not found"
                };
            }

            return new UserProfileModel
            {
                IsSuccess = true,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName ?? string.Empty,
                Email = user.Email ?? string.Empty
            };
        }

        public Task SendConfirmationEmail(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<MethodResponse> UpdateEmail(UserProfileModel model)
        {
            throw new NotImplementedException();
        }

        public async Task<MethodResponse> UpdatePassword(string userId, PasswordUpdateViewModel model)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if(user == null)
            {
                return new MethodResponse(false, "User not found", null);
                
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return new MethodResponse(false, "Password update failed", null);
            }

            return new MethodResponse(true, "Password updated", null);
        }
    }
}