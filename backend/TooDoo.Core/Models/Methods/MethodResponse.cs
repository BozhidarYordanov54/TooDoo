namespace TooDoo.Core.Models.Methods
{
    public class MethodResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public object? Data { get; set; }
        public string? returnUrl { get; set; }
        public string? Token { get; set; }

        public MethodResponse(string token)
        {
            Token = token;
        }

        public MethodResponse(bool success, string message, object? data)
        {
            Success = success;
            Message = message;
            Data = data;
        }

        public MethodResponse(bool success, string message, string? returnUrl, string? token, object? data)
        {
            Success = success;
            Message = message;
            Data = data;
            this.returnUrl = returnUrl;
            Token = token;
        }
    }
}