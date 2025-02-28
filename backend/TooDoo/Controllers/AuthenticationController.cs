using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TooDoo.Core.Models.User;
using TooDoo.Core.Services.Contracts;
using Microsoft.Extensions.Logging;

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
                return BadRequest("Invalid model");

            var response = await _authenticationService.Register(model);

            if (!response.Success)
                return BadRequest(response.Message);

            return Ok(new { message = response.Message });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid model");

            var response = await _authenticationService.Login(model);

            if (!response.Success)
                return Unauthorized(response.Message);

            SetCookies(HttpContext, response.Token, response.RefreshToken);

            return Ok(new { response.Token, response.RefreshToken, response.Message });
        }

        [HttpPost("refresh")]
        [Authorize]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Headers["refresh_token"].ToString();

            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized("Refresh token is missing");

            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
                return Unauthorized("User email not found in claims");

            var userLoginModel = new UserRefreshTokenModel { Email = userEmail, RefreshToken = refreshToken };
            var response = await _authenticationService.RefreshToken(userLoginModel);

            if (!response.Success)
                return Unauthorized(response.Message);

            SetCookies(HttpContext, response.Token, response.RefreshToken);

            return Ok(new { response.Token, response.RefreshToken, response.Message });
        }

        private void SetCookies(HttpContext context, string accessToken, string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            };

            context.Response.Cookies.Append("access_token", accessToken, cookieOptions);
            context.Response.Cookies.Append("refresh_token", refreshToken, cookieOptions);
        }

        private void RemoveCookies(HttpContext context)
        {
            context.Response.Cookies.Delete("access_token");
            context.Response.Cookies.Delete("refresh_token");
        }
    }
}
