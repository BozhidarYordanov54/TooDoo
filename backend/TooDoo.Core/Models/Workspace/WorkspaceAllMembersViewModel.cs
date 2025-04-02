using TooDoo.Infrastructure.Data.Enums;

namespace TooDoo.Core.Models.Workspace
{
    public class WorkspaceAllMembersViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string LastActive { get; set; } = string.Empty;
        public WorkspaceRole Role { get; set; }
        

    }
}