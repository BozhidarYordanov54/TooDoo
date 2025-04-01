using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TooDoo.Core.Contracts;
using TooDoo.Core.Models.Workspace;
using TooDoo.Extensions;

namespace TooDoo.Controllersy
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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

            if(string.IsNullOrEmpty(userId))
            {
                _logger.LogError("Unauthorized access attempt to create workspace.");
                return BadRequest("User ID is required.");
            }

            model.OwnerId = userId;
            await _workspaceService.AddWorkspaceAsync(model);

            return Ok(new {message = "Workspace created successfully.", data = model});
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
    }
}