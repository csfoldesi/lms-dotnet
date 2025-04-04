using System.Security.Claims;
using Domain;

namespace Application.Common.Interfaces;

public interface IIdentityService
{
    Task<User> CreateOauthUserAsync(ClaimsPrincipal claimsPrincipal);
    Task<User?> GetUserByIdAsync(string userId);
}
