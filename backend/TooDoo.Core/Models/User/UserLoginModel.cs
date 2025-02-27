using System.ComponentModel.DataAnnotations;

namespace TooDoo.Core.Models.User
{
    public class UserLoginModel
    {
        public string? Email { get; set; }
        public string? UserName { get; set; }
        
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}