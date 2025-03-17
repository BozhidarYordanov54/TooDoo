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
        public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model");
            }

            var response = await _authenticationService.Register(model);

            if (!response.Success){
                return BadRequest(response.Message);
            }

            return Ok(new { message = response.Message });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(GetModelErrors());
            }

            var response = await _authenticationService.Login(model);

            if (!response.Success)
                return Unauthorized(response.Message);

            // SetCookies(HttpContext, response.Token, response.RefreshToken);

            return Ok(new { response.Username, response.Token, response.RefreshToken, response.Message });
        }

        [AllowAnonymous]
        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken(UserRefreshTokenModel model)
        {
            var loginRequest = await _authenticationService.RefreshToken(model);
            if(!loginRequest.Success)
            {
                return BadRequest(loginRequest.Message);
            }

            return Ok(loginRequest);
        }

        private List<string> GetModelErrors()
        {
            return ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
        }
    }
}
