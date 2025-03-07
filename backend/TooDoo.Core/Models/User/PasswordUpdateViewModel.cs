using TooDoo.Core.Models.Common;

namespace TooDoo.Core.Models.User
{
    public class PasswordUpdateViewModel : ModelResult
    {
        public string CurrentPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}