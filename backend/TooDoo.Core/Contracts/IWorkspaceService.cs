using TooDoo.Core.Models.Boards;
using TooDoo.Core.Models.Tasks;
using TooDoo.Core.Models.Workspace;

namespace TooDoo.Core.Contracts
{
    public interface IWorkspaceService
    {
        Task AddWorkspaceAsync(WorkspaceFormModel model);
        Task CreateTaskAsync(TaskFormViewModel model);
        Task CreateBoardAsync(BoardFormViewModel model);
        Task<IEnumerable<WorkspaceAllViewModel>> GetAllWorkspacesAsync(string userId);
        Task<IEnumerable<WorkspaceAllMembersViewModel>> GetAllMembersAsync(string workspaceId);
        Task<IEnumerable<BoardAllViewModel>> GetAllBoardsAsync(string workspaceName);
        Task<IEnumerable<TaskAllViewModel>> GetAllTasksAsync(string boardName);
        Task<string> CreateInviteLinkAsync(string workspaceName);
    }
}