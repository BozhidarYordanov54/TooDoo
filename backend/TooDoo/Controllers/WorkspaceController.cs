using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TooDoo.Core.Contracts;
using TooDoo.Core.Models.Boards;
using TooDoo.Core.Models.Tasks;
using TooDoo.Core.Models.Workspace;
using TooDoo.Extensions;

namespace TooDoo.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class WorkspaceController : ControllerBase
    {
        private readonly IWorkspaceService _workspaceService;
        private readonly ILogger<WorkspaceController> _logger;

        public WorkspaceController(IWorkspaceService workspaceService, ILogger<WorkspaceController> logger)
        {
            _workspaceService = workspaceService;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateWorkspace([FromForm] WorkspaceFormModel model)
        {
            string userId = User.GetUserId() ?? string.Empty;

            if (string.IsNullOrEmpty(userId))
            {
                _logger.LogError("Unauthorized access attempt to create workspace.");
                return BadRequest("User ID is required.");
            }

            model.OwnerId = userId;
            await _workspaceService.AddWorkspaceAsync(model);

            return Ok(new { message = "Workspace created successfully.", data = model });
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllWorkspaces()
        {
            string userId = User.GetUserId() ?? string.Empty;

            _logger.LogWarning("User ID: {UserId}", userId);

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is required.");
            }

            var workspaces = await _workspaceService.GetAllWorkspacesAsync(userId);
            return Ok(workspaces);
        }

        [HttpGet("members/{workspaceName}")]
        public async Task<IActionResult> GetAllMembers(string workspaceName)
        {
            string userId = User.GetUserId() ?? string.Empty;

            _logger.LogWarning("User ID: {UserId}", userId);

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is required.");
            }

            var members = await _workspaceService.GetAllMembersAsync(workspaceName);
            return Ok(members);
        }

        [HttpGet("getWorkspaceBoards/{workspaceName}")]
        public async Task<IActionResult> GetWorkspaceBoards(string workspaceName)
        {
            string userId = User.GetUserId() ?? string.Empty;
            _logger.LogWarning("User ID: {UserId}", userId);

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is required.");
            }

            var boards = await _workspaceService.GetAllBoardsAsync(workspaceName);
            if (boards == null || !boards.Any())
            {
                return NotFound("No boards found for the specified workspace.");
            }

            return Ok(new { boards = boards });
        }

        [HttpPost("createInvite")]
        public async Task<IActionResult> CreateInviteLink(string workspaceName)
        {
            string userId = User.GetUserId() ?? string.Empty;
            _logger.LogWarning("Inviting");

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is required.");
            }

            var inviteLink = await _workspaceService.CreateInviteLinkAsync(workspaceName);
            return Ok(new { message = "Invite link created successfully.", inviteLink = inviteLink });
        }

        [HttpPost("createBoard/{workspaceName}")]
        public async Task<IActionResult> CreateBoard(BoardFormViewModel model)
        {
            string userId = User.GetUserId() ?? string.Empty;

            _logger.LogWarning($"{model.ImageUrl}");

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is required.");
            }

            await _workspaceService.CreateBoardAsync(model);
            return Ok(new { message = "Board created successfully.", model = model });
        }

        [HttpPost("createTask")]
        public async Task<IActionResult> CreateTask(TaskFormViewModel model)
        {
            string userId = User.GetUserId() ?? string.Empty;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is required.");
            }

            model.CreatedBy = userId;

            await _workspaceService.CreateTaskAsync(model);
            return Ok(new { message = "Task created successfully.", model = model });
        }

        [HttpGet("getBoardTasks/{boardName}")]
        public async Task<IActionResult> GetBoardTasks(string boardName)
        {
            string userId = User.GetUserId() ?? string.Empty;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is required.");
            }

            var tasks = await _workspaceService.GetAllTasksAsync(boardName);
            if (tasks == null || !tasks.Any())
            {
                return NotFound("No tasks found for the specified board.");
            }

            return Ok(new { tasks = tasks });
        }
    }
}