using System.Security.Claims;
using Infrastructure.Identity.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
                    IssuerSigningKeyResolver = (token, securityToken, kid, parameters) =>
                    {
                        // Fetch JWKS from Clerk
                        var jwksClient = new HttpClient();
                        var jwksResponse = jwksClient.GetStringAsync(config.JwksUrl).Result;
                        var jwks = new JsonWebKeySet(jwksResponse);
                        return jwks.Keys;
                    },
                };

                // Map Clerk claims to ASP.NET Core claims
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
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

                        return Task.CompletedTask;
                    },
                };
            });

        services.AddAuthorization();

        return services;
    }
}
