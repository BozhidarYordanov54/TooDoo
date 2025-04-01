using Microsoft.EntityFrameworkCore;
using TooDoo.Core.Contracts;
using TooDoo.Core.Models.Boards;
using TooDoo.Core.Models.Workspace;
using TooDoo.Infrastructure.Common;
using TooDoo.Infrastructure.Data.Models;
using Task = System.Threading.Tasks.Task;

namespace TooDoo.Core.Services
{
    public class WorkspaceService : IWorkspaceService
    {
        private const string WorkspaceImagePath = "public/images/workspaces/";
        
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

        public Task<string> CreateInviteLinkAsync(string workspaceId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<WorkspaceAllMembersViewModel>> GetAllMembersAsync(string workspaceId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<WorkspaceAllViewModel>> GetAllWorkspacesAsync(string userId)
        {
            return await _repo.GetAllAsync<Workspace>()
                .Where(x => x.OwnerId == userId)
                .Select(x => new WorkspaceAllViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    OwnerId = x.OwnerId,
                    Boards = x.Boards.Select(b => new BoardAllViewModel
                    {
                        Id = b.Id,
                        Name = b.Name,
                    }).ToList()
                    
                }).ToListAsync();
        }
    }
}