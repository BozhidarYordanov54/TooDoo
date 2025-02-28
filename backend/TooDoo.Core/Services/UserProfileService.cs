using TooDoo.Core.Contracts;
using TooDoo.Core.Models.Methods;
using TooDoo.Core.Models.User;
using TooDoo.Infrastructure.Common;
using TooDoo.Infrastructure.Data.Models;

namespace TooDoo.Core.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IRepository _repository;

        public UserProfileService(IRepository repository)
        {
            _repository = repository;
        }

        public Task<MethodResponse> ConfirmEmail(string userId, string token)
        {
            throw new NotImplementedException();
        }

        public async Task<UserProfileModel> GetUserProfileDetais(string userId)
        {
            var user = await _repository.GetByIdAsync<User>(userId);

            if(user == null)
            {
                return null;
            }

            UserProfileModel model = new UserProfileModel
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email
            };

            return model;
        }

        public Task SendConfirmationEmail(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<MethodResponse> UpdateEmail(UserProfileModel model)
        {
            throw new NotImplementedException();
        }

        public Task<MethodResponse> UpdatePassword(UserProfileModel model)
        {
            throw new NotImplementedException();
        }
    }
}