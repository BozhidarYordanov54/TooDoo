using System.Security.Claims;

namespace TooDoo.Extensions
{
    public static class ClaimPrincipalExtension
    {
        public static string GetUserId(this ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        }
    }
}