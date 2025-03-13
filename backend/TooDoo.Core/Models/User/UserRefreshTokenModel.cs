namespace TooDoo.Core.Models.User
{
    public class UserRefreshTokenModel
    {
        public string Token { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}