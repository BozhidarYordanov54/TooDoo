using TooDoo.Core.Models.Common;

namespace TooDoo.Core.Models.User
{
    public class UserProfileModel : ModelResult
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}