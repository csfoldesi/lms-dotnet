using System.Net;
using System.Text.Json;
using Application.Common.Interfaces;
using NLog;

namespace API.Middleware;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILoggerService _logger;

    public ErrorHandlingMiddleware(RequestDelegate next, ILoggerService logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex, _logger);
        }
    }

    private static Task HandleExceptionAsync(
        HttpContext context,
        Exception exception,
        ILoggerService logger
    )
    {
        var code = HttpStatusCode.InternalServerError;
        var result = string.Empty;

        using (ScopeContext.PushProperty("context", "TestContext"))
        {
            switch (exception)
            {
                case Application.Common.Exceptions.NotFoundException _:
                    code = HttpStatusCode.NotFound;
                    result = JsonSerializer.Serialize(
                        new { IsSuccess = false, ErrorMessage = exception.Message }
                    );
                    break;
                case Application.Common.Exceptions.UnauthorizedException _:
                    code = HttpStatusCode.Unauthorized;
                    result = JsonSerializer.Serialize(
                        new { IsSuccess = false, ErrorMessage = exception.Message }
                    );
                    break;
                default:
                    result = JsonSerializer.Serialize(
                        new { error = "An error occurred while processing your request." }
                    );
                    logger.LogError(exception, "An error occurred while processing your request.");
                    break;
            }
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)code;

        return context.Response.WriteAsync(result);
    }
}
