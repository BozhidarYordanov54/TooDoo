namespace TooDoo.Core.Models.User
{
    public class UserRefreshTokenModel
    {
        public string JwtToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}