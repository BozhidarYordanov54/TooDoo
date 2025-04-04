using Microsoft.EntityFrameworkCore;
using TooDoo.Core.Contracts;
using TooDoo.Core.Models.Boards;
using TooDoo.Core.Models.Tasks;
using TooDoo.Core.Models.Workspace;
using TooDoo.Infrastructure.Common;
using TooDoo.Infrastructure.Data.Models;
using Task = System.Threading.Tasks.Task;
using CustomTask = TooDoo.Infrastructure.Data.Models.Task;
using TooDoo.Infrastructure.Data.Enums;
using TaskStatus = TooDoo.Infrastructure.Data.Enums.TaskStatus;

namespace TooDoo.Core.Services
{
    public class WorkspaceService : IWorkspaceService
    {
        private const string WorkspaceImagePath = "public/images/workspaces/";
        private string InviteLink = "https://localhost:5173/workspace/invite/";

        private readonly IRepository _repo;

        public WorkspaceService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task AddWorkspaceAsync(WorkspaceFormModel model)
        {
            await _repo.AddAsync(new Workspace
            {
                Name = model.Name,
                Description = model.Description,
                OwnerId = model.OwnerId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                DeletedAt = null,
            });

            await _repo.SaveChangesAsync();
        }

        public async Task CreateBoardAsync(BoardFormViewModel model)
        {
            string? workspaceId = await _repo.GetAllAsync<Workspace>()
                .Where(x => x.Name == model.WorkspaceName)
                .Select(x => x.Id)
                .FirstOrDefaultAsync();



            if (string.IsNullOrEmpty(workspaceId))
            {
                throw new ArgumentException("Workspace not found.");
            }

            var board = new Board
            {
                Name = model.Name,
                Description = model.Description,
                ImageUrl = model.ImageUrl,
                WorkspaceId = workspaceId,
            };

            await _repo.AddAsync(board);
            await _repo.SaveChangesAsync();
        }

        public async Task<string> CreateInviteLinkAsync(string workspaceName)
        {
            string inviteLink = InviteLink + Guid.NewGuid().ToString();

            var workspaceId = await _repo.GetAllAsync<Workspace>()
                .Where(x => x.Name == workspaceName)
                .Select(x => x.Id)
                .FirstOrDefaultAsync();

            var workspaceInviteLink = new WorkspaceInviteLink
            {
                Link = inviteLink,
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                Count = 0,
                WorkspaceId = workspaceId ?? string.Empty,
            };

            await _repo.AddAsync(workspaceInviteLink);
            await _repo.SaveChangesAsync();

            return inviteLink;
        }

        public async Task<IEnumerable<WorkspaceAllMembersViewModel>> GetAllMembersAsync(string workspaceName)
        {
            return await _repo.GetAllAsync<WorkspaceMembers>()
                .Include(x => x.Member)
                .Where(x => x.Workspace.Name == workspaceName)
                .Select(x => new WorkspaceAllMembersViewModel
                {
                    Id = x.MemberId,
                    Role = x.Member.Role,
                    Username = x.Member.User.UserName ?? string.Empty,
                    Name = x.Member.User.FirstName + x.Member.User.LastName ?? string.Empty,
                    LastActive = x.Member.CreatedAt.ToString("dd/MM/yyyy"),
                }).ToListAsync();

        }

        public async Task<IEnumerable<WorkspaceAllViewModel>> GetAllWorkspacesAsync(string userId)
        {
            return await _repo.GetAllAsync<Workspace>()
                .Where(x => x.OwnerId == userId)
                .Select(x => new WorkspaceAllViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    OwnerId = x.OwnerId ?? string.Empty,
                    Boards = x.Boards.Select(b => new BoardAllViewModel
                    {
                        Id = b.Id,
                        Name = b.Name,
                        ImageUrl = b.ImageUrl,
                    }).ToList()

                }).ToListAsync();
        }

        public async Task<IEnumerable<BoardAllViewModel>> GetAllBoardsAsync(string workspaceName)
        {
            return await _repo.GetAllAsync<Board>()
                .Where(x => x.Workspace.Name == workspaceName)
                .Select(x => new BoardAllViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    ImageUrl = x.ImageUrl,
                }).ToListAsync();
        }

        public async Task CreateTaskAsync(TaskFormViewModel model)
        {
            var boardId = await _repo.GetAllAsync<Board>()
                .Where(x => x.Name == model.BoardName)
                .Select(x => x.Id)
                .FirstOrDefaultAsync();

            if (string.IsNullOrEmpty(boardId))
            {
                throw new ArgumentException("Board not found.");
            }

            var task = new CustomTask{
                Title = model.TaskTitle,
                Description = model.TaskDescription,
                Priority = model.Priority switch
                {
                    "High" => TaskPriority.High,
                    "Medium" => TaskPriority.Medium,
                    "Low" => TaskPriority.Low,
                    _ => TaskPriority.Low,
                },
                BoardId = boardId,
                AssignedTo = model.AssignedTo,
                DueDate = model.DueDate,
                Status = TaskStatus.TooDoo,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsCompleted = false,
                CompletedAt = null,
                UserId = model.CreatedBy,
            };


            await _repo.AddAsync(task);
            await _repo.SaveChangesAsync();
        }

        public async Task<IEnumerable<TaskAllViewModel>> GetAllTasksAsync(string boardName)
        {
            return await _repo.GetAllAsync<CustomTask>()
                .Where(x => x.Board.Name == boardName)
                .Select(x => new TaskAllViewModel
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Priority = x.Priority.ToString(),
                    Status = x.Status.ToString(),
                    AssignedTo = x.AssignedTo ?? string.Empty,
                    CreatedBy = x.UserId,
                    DueDate = x.DueDate,
                }).ToListAsync();
        }
    }
}