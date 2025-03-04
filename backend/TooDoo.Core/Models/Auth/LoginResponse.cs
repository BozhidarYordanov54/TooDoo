namespace TooDoo.Core.Models.Auth
{
    public class LoginResponse
    {

        public LoginResponse()
        {
            
        }

        public LoginResponse(string message, bool success)
        {
            Message = message;
            Success = success;
        }

        public LoginResponse(string token, string refreshToken, string? message)
        {
            Token = token;
            RefreshToken = refreshToken;
            Message = message ?? string.Empty;
        }

        public LoginResponse(string token, string refreshToken, string? message, bool success)
        {
            Token = token;
            RefreshToken = refreshToken;
            Message = message ?? string.Empty;
            Success = success;
        }

        public bool Success { get; set; }
        public string Token { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}