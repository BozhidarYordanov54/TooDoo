using System.ComponentModel.DataAnnotations;
using static TooDoo.Core.Constants.LengthConstants.UserLengthConstants;
using static TooDoo.Core.Constants.MessageConstants.UserMessages;

namespace TooDoo.Core.Models.User
{
    public class UserRegisterModel
    {
        [Required]
        [StringLength(NameMaxLength, 
            ErrorMessage = "Invalid Name -> TO BE CHANGED", 
            MinimumLength = NameMinLength)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(NameMaxLength, 
            ErrorMessage = "Invalid Name -> TO BE CHANGED", 
            MinimumLength = NameMinLength)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(UserNameMaxLength, 
            ErrorMessage = "Invalid Name -> TO BE CHANGED", 
            MinimumLength = UserNameMinLength)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.EmailAddress)]
        [StringLength(EmailMaxLength, 
            ErrorMessage = "Invalid Name -> TO BE CHANGED", 
            MinimumLength = EmailMinLength)]
        public string Email { get; set; } = string.Empty;


        [Required]
        [DataType(DataType.Password)]
        [StringLength(PasswordMaxLength,
            ErrorMessage = "Invalid Name -> TO BE CHANGED", 
            MinimumLength = PasswordMinLength)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        [StringLength(PasswordMaxLength, 
            ErrorMessage = "Invalid Name -> TO BE CHANGED", 
            MinimumLength = PasswordMinLength)]
        public string ConfirmPassword { get; set; } = string.Empty;

    }
}