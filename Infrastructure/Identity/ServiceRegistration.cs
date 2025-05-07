using System.Diagnostics;
using System.Security.Claims;
using Domain;
using Infrastructure.Identity.Settings;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
        var clerkConfig = configuration.GetSection(nameof(ClerkSettings)).Get<ClerkSettings>()!;
        var auth0Config = configuration.GetSection(nameof(Auth0Settings)).Get<Auth0Settings>()!;

        services
            .AddIdentityCore<User>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<User>>();

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(
                "Clerk",
                options =>
                {
                    options.Authority = clerkConfig.Authority;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = clerkConfig.Issuer,
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
                            var userId = claimsIdentity!
                                .FindFirst(ClaimTypes.NameIdentifier)
                                ?.Value;
                            var email = claimsIdentity!.FindFirst(ClaimTypes.Email)?.Value;
                            var name = string.Format(
                                "{0} {1}",
                                claimsIdentity!.FindFirst(ClaimTypes.GivenName)?.Value,
                                claimsIdentity!.FindFirst(ClaimTypes.Surname)?.Value
                            );
                            var role = claimsIdentity!.FindFirst(ClaimTypes.Role)?.Value;
                            userId = await CreateOauthUserAsync(context, userId, email, name, role);
                            claimsIdentity!.AddClaim(new Claim("global_id", userId));
                        },
                    };
                }
            )
            .AddJwtBearer(
                "Auth0",
                options =>
                {
                    options.Authority = auth0Config.Authority;
                    options.Audience = auth0Config.Audience;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = auth0Config.Issuer,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = async context =>
                        {
                            var claimsIdentity = context.Principal?.Identity as ClaimsIdentity;

                            /*var userIdClaim = claimsIdentity?.FindFirst("sub");
                            if (userIdClaim != null)
                            {
                                claimsIdentity!.AddClaim(
                                    new Claim(ClaimTypes.NameIdentifier, userIdClaim.Value)
                                );
                            }*/
                            var userId = claimsIdentity!
                                .FindFirst(ClaimTypes.NameIdentifier)
                                ?.Value;
                            var email = claimsIdentity!.FindFirst(ClaimTypes.Email)?.Value;
                            var name = string.Format(
                                "{0} {1}",
                                claimsIdentity!.FindFirst(ClaimTypes.GivenName)?.Value,
                                claimsIdentity!.FindFirst(ClaimTypes.Surname)?.Value
                            );
                            var role = claimsIdentity!.FindFirst(ClaimTypes.Role)?.Value;
                            userId = await CreateOauthUserAsync(context, userId, email, name, role);
                            claimsIdentity!.AddClaim(new Claim("global_id", userId));
                        },
                    };
                }
            );

        services.AddAuthorization(options =>
        {
            var policy = new AuthorizationPolicyBuilder("Clerk", "Auth0")
                .RequireAuthenticatedUser()
                .Build();
            options.DefaultPolicy = policy;
        });

        return services;
    }

    private static async Task<string> CreateOauthUserAsync(
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

        if (email != null)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                user = new User
                {
                    Id = userId ?? Guid.NewGuid().ToString(),
                    UserName = email!,
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
                if (roles.Count > 0)
                {
                    await userManager.RemoveFromRolesAsync(user, roles);
                }
                if (string.IsNullOrEmpty(role))
                {
                    role = "Teacher";
                }
                await userManager.AddToRoleAsync(user, role!);
                return user.Id;
            }
        }
        return string.Empty;
    }
}
