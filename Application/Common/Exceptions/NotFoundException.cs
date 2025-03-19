namespace Application.Common.Exceptions;

public class NotFoundException : ApplicationException
{
    public NotFoundException()
        : base("Not found") { }

    public NotFoundException(string? message)
        : base(message ?? "Not found") { }
}
