using Application.Common.Interfaces;
using NLog;

namespace Infrastructure.Logging;

public class LoggerService : ILoggerService
{
    private readonly Logger _logger;

    public LoggerService()
    {
        _logger = LogManager.GetCurrentClassLogger();
    }

    public void LogError(Exception exception, string message, params object[] args)
    {
        _logger.Error(exception, message, args);
    }

    public void LogInfo(string message, params object[] args)
    {
        _logger.Info(message, args);
    }

    public void LogWarning(string message, params object[] args)
    {
        _logger.Warn(message, args);
    }
}
