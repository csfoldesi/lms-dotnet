using Application.Common.Interfaces;
using Infrastructure.Payment.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Payment;

public static class ServiceRegistration
{
    public static IServiceCollection AddPaymentServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddScoped<IPaymentService, StripeService>();
        services.Configure<StripeSettings>(configuration.GetSection(nameof(StripeSettings)));

        return services;
    }
}
