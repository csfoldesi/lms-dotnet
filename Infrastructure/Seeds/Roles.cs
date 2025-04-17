using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Seeds;

public static class Roles
{
    public static async Task SeedAsync(RoleManager<IdentityRole> roleManager)
    {
        foreach (var role in Enum.GetValues<Identity.Roles>())
        {
            if (!await roleManager.RoleExistsAsync(role.ToString()!))
            {
                await roleManager.CreateAsync(new IdentityRole(role.ToString()!));
            }
        }
    }
}
