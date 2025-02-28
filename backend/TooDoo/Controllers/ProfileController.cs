using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TooDoo.Core.Contracts;
using TooDoo.Extensions;

namespace TooDoo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;

        public ProfileController(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        [HttpGet("details")]
        public async Task<IActionResult> GetUserProfileDetails()
        {
            var userId = User.GetUserId();

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("Invalid user");
            }

            var model = await _userProfileService.GetUserProfileDetais(userId);

            if (model == null)
            {
                return NotFound("User not found");
            }

            return Ok(new {model});
        }
    }
}