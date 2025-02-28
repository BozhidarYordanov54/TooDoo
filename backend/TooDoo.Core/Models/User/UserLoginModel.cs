using System.ComponentModel.DataAnnotations;
using static TooDoo.Core.Constants.LengthConstants.UserLengthConstants;
using static TooDoo.Core.Constants.MessageConstants.InvalidUserMessages;

namespace TooDoo.Core.Models.User
{
    public class UserLoginModel
    {
        [DataType(DataType.EmailAddress)]
        [StringLength(EmailMaxLength, 
            ErrorMessage = InvalidEmail, 
            MinimumLength = EmailMinLength)]
        public string? Email { get; set; }

        [StringLength(UserNameMaxLength, 
            ErrorMessage = InvalidUserName, 
            MinimumLength = UserNameMinLength)]
        public string? UserName { get; set; }
        
        [Required]
        [StringLength(PasswordMaxLength, 
            ErrorMessage = InvalidPassword, 
            MinimumLength = PasswordMinLength)]
        public string Password { get; set; } = string.Empty;
    }
}