using Microsoft.AspNetCore.Http;

namespace TooDoo.Core.Models.Workspace
{
    public class WorkspaceFormModel
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string? OwnerId { get; set; } = string.Empty;
    }
}