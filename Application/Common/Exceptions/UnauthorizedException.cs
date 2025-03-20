namespace Application.Common.Exceptions;

public class UnauthorizedException : ApplicationException
{
    public UnauthorizedException()
        : base("Unauthorized") { }

    public UnauthorizedException(string? message)
        : base(message ?? "Unauthorized") { }
}
