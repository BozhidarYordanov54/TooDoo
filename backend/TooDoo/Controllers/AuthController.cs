using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TooDoo.Core.Models.User;
using TooDoo.Core.Services.Contracts;
using Microsoft.Extensions.Logging;
using TooDoo.Extensions;

namespace TooDoo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authenticationService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authenticationService, ILogger<AuthController> logger)
        {
            _authenticationService = authenticationService;
            _logger = logger;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model");
            }

            var response = await _authenticationService.Register(model);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(new { message = response.Message });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(GetModelErrors());
            }

            var response = await _authenticationService.Login(model);

            if (!response.Success)
                return BadRequest(new {message = response.Message});

            await _authenticationService.SetAuthCookies(Response, response.Token, response.RefreshToken);

            return Ok(new { response.Username, response.Token, response.RefreshToken, response.Message });
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authenticationService.Logout(Request, Response);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshRequest = await _authenticationService.RefreshToken(Request, Response);

            if (!refreshRequest.Success)
            {
                return Unauthorized(refreshRequest.Message);
            }

            await _authenticationService.SetAuthCookies(Response, refreshRequest.Token, refreshRequest.RefreshToken);

            return Ok(refreshRequest);
        }

        private List<string> GetModelErrors()
        {
            return ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
        }
    }
}
