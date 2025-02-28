namespace TooDoo.Core.Models.User
{
    public class UserRefreshTokenModel
    {
        public string Email { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}