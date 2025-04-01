using TooDoo.Infrastructure.Data.Enums;

namespace TooDoo.Core.Models.Workspace
{
    public class WorkspaceAllMembersViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public DateTime LastActive { get; set; } 
        public WorkspaceRole Role { get; set; }
        

    }
}