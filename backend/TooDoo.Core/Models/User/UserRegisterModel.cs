using System.ComponentModel.DataAnnotations;

namespace TooDoo.Core.Models.User
{
    public class UserRegisterModel
    {
        [Required]
        [StringLength(50, ErrorMessage ="Invalid Name -> TO BE CHANGED", MinimumLength = 3)]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        [StringLength(50, ErrorMessage ="Invalid Name -> TO BE CHANGED", MinimumLength = 3)]
        public string LastName { get; set; } = string.Empty;
        [Required]
        [StringLength(50, ErrorMessage ="Invalid Name -> TO BE CHANGED", MinimumLength = 3)]
        public string UserName { get; set; } = string.Empty;
        [Required]
        [StringLength(50, ErrorMessage ="Invalid Name -> TO BE CHANGED", MinimumLength = 3)]
        public string Email { get; set; } = string.Empty;
        [Required]
        [StringLength(50, ErrorMessage ="Invalid Name -> TO BE CHANGED", MinimumLength = 3)]
        public string Password { get; set; } = string.Empty;
        [Required]
        [StringLength(50, ErrorMessage ="Invalid Name -> TO BE CHANGED", MinimumLength = 3)]
        public string ConfirmPassword { get; set; } = string.Empty;

    }
}