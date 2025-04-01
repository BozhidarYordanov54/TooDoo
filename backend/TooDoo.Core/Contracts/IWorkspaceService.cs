using TooDoo.Core.Models.Workspace;

namespace TooDoo.Core.Contracts
{
    public interface IWorkspaceService
    {
        Task AddWorkspaceAsync(WorkspaceFormModel model);
        Task<IEnumerable<WorkspaceAllViewModel>> GetAllWorkspacesAsync(string userId);
        Task<IEnumerable<WorkspaceAllMembersViewModel>> GetAllMembersAsync(string workspaceId);
        Task<string> CreateInviteLinkAsync(string workspaceId);
    }
}