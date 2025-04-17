using System.Security.Claims;
using Domain;
using Infrastructure.Identity.Settings;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Identity;

public static class ServiceRegistration
{
    public static IServiceCollection AddIdentityServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        var config = configuration.GetSection(nameof(ClerkSettings)).Get<ClerkSettings>()!;

        services
            .AddIdentityCore<User>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<User>>();

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.Authority = config.Authority;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = config.Issuer,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    // Clerk uses JWKS for signing key validation
                    /*IssuerSigningKeyResolver = (token, securityToken, kid, parameters) =>
                    {
                        // Fetch JWKS from Clerk
                        var jwksClient = new HttpClient();
                        var jwksResponse = jwksClient.GetStringAsync(config.JwksUrl).Result;
                        var jwks = new JsonWebKeySet(jwksResponse);
                        return jwks.Keys;
                    },*/
                };

                // Map Clerk claims to ASP.NET Core claims
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async context =>
                    {
                        var claimsIdentity = context.Principal?.Identity as ClaimsIdentity;

                        // Extract Clerk user ID
                        var userIdClaim = claimsIdentity?.FindFirst("sub");
                        if (userIdClaim != null)
                        {
                            claimsIdentity!.AddClaim(
                                new Claim(ClaimTypes.NameIdentifier, userIdClaim.Value)
                            );
                        }
                        var userId = claimsIdentity!.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                        var email = claimsIdentity!.FindFirst(ClaimTypes.Email)?.Value;
                        var name = string.Format(
                            "{0} {1}",
                            claimsIdentity!.FindFirst(ClaimTypes.GivenName)?.Value,
                            claimsIdentity!.FindFirst(ClaimTypes.Surname)?.Value
                        );
                        var role = claimsIdentity!.FindFirst(ClaimTypes.Role)?.Value;
                        await CreateOauthUserAsync(context, userId, email, name, role);
                    },
                };
            });

        services.AddAuthorization();

        return services;
    }

    private static async Task CreateOauthUserAsync(
        TokenValidatedContext context,
        string? userId,
        string? email,
        string? name,
        string? role
    )
    {
        var userManager = context.HttpContext.RequestServices.GetRequiredService<
            UserManager<User>
        >();

        if (userId != null)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                user = new User
                {
                    Id = userId,
                    UserName = email ?? userId,
                    Email = email,
                    Name = name,
                };
                var createUserResult = await userManager.CreateAsync(user);
                if (!createUserResult.Succeeded)
                {
                    user = null;
                }
            }
            if (user != null)
            {
                var roles = await userManager.GetRolesAsync(user);
                if (roles.Count > 1)
                {
                    await userManager.RemoveFromRolesAsync(user, roles);
                }
                if (string.IsNullOrEmpty(role))
                {
                    role = "Teacher";
                }
                await userManager.AddToRoleAsync(user, role!);
            }
        }
    }
}
