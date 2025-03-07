using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TooDoo.Core.Contracts;
using TooDoo.Core.Models.Common;
using TooDoo.Core.Models.User;
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

        [HttpPost("updatePassword")]
        public async Task<IActionResult> UpdatePasswordAsync([FromBody] PasswordUpdateViewModel model)
        {
            var userId = User.GetUserId();

            if(string.IsNullOrEmpty(userId))
            {
                return BadRequest("Invalid user");
            }

            var response = await _userProfileService.UpdatePassword(userId, model);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response.Message);
        }

        [HttpGet("details")]
        public async Task<IActionResult> ProfileDetails()
        {
            var userId = User.GetUserId();

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("Invalid user");
            }

            var model = await _userProfileService.GetUserProfileDetais(userId);

            if (!model.IsSuccess)
            {
                return BadRequest(model.Message);
            }

            return Ok(new {model});
        }
    }
}