using System.Net;
using System.Text.Json;

namespace API.Middleware;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var code = HttpStatusCode.InternalServerError;
        var result = string.Empty;

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
                break;
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)code;

        return context.Response.WriteAsync(result);
    }
}
