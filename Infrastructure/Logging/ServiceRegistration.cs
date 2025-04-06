using Application.Common.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Logging;

public static class ServiceRegistration
{
    public static IServiceCollection AddLoggingServices(this IServiceCollection services)
    {
        services.AddSingleton<ILoggerService, LoggerService>();

        return services;
    }
}
