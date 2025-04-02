using Microsoft.AspNetCore.Http;

namespace TooDoo.Core.Models.Boards
{
    public class BoardFormViewModel
    {
        public string WorkspaceName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
    }
}