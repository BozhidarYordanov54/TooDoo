using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TooDoo.Core.Models.User;
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
        public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
        {
            var response = await _authenticationService.Register(model);

            return Ok(response.Message);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            var response = await _authenticationService.Login(model);

            SetCookies(HttpContext, response.Token, response.RefreshToken);

            return Ok(new {response.Token, response.RefreshToken, response.Message});
        }

        [HttpGet("refresh")]
        [Authorize]
        public async Task<IActionResult> Refresh()
        {
            string refreshToken = HttpContext.Request.Headers["refresh_token"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized();

            string userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            var userLoginModel = new UserRefreshTokenModel { Email = userEmail, RefreshToken = refreshToken };
            var response = await _authenticationService.RefreshToken(userLoginModel);
            if (!response.Success)
                return Unauthorized();

            SetCookies(HttpContext, response.Token, response.RefreshToken);

            return Ok(new {response.Token, response.RefreshToken, response.Message});
        }
        private void SetCookies(HttpContext context, string accessToken, string refreshToken)
        {
            context.Response.Cookies.Append("access_token", accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            context.Response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });
        }

        private void RemoveCookies(HttpContext context)
        {
            context.Response.Cookies.Delete("access_token");
            context.Response.Cookies.Delete("refresh_token");
        }
    }
}