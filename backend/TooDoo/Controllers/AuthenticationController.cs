using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TooDoo.Core.Services;
using TooDoo.Core.Services.Contracts;

namespace TooDoo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(IAuthenticationService authenticationService, ILogger<AuthenticationController> logger)
        {
            _authenticationService = authenticationService;
            _logger = logger;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register()
        {
            _logger.LogWarning("Currently in RegisterController.Register()");

            string token = await _authenticationService.Register("testmail@mail.com", "Password1324!");

            return Ok(token);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public Task<IActionResult> Login()
        {
            throw new NotImplementedException();
        }

        [Authorize]
        [HttpPost("logout")]
        public Task<IActionResult> Logout()
        {
            throw new NotImplementedException();
        }
    }
}