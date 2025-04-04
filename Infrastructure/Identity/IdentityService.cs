using System.Security.Claims;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<User> _userManager;

    public IdentityService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<User> CreateOauthUserAsync(ClaimsPrincipal claimsPrincipal)
    {
        var userId = claimsPrincipal.FindFirstValue("sub");
        if (userId != null)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                user = new User { Id = userId };
                await _userManager.CreateAsync(user);
            }
            return user;
        }
        throw new UnauthorizedException();
    }

    public async Task<User?> GetUserByIdAsync(string userId)
    {
        return await _userManager.Users.FirstOrDefaultAsync(x => x.Id == userId);
    }
}
