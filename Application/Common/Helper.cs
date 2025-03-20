using Application.Common.Exceptions;
using Domain;

namespace Application.Common;

public static class Helper
{
    public static void AssertIsNotNull(Object? entity, string? message = null)
    {
        if (entity == null)
        {
            throw new NotFoundException(message);
        }
    }

    public static void AssertIsOwner(Course course, string userId, string? message = null)
    {
        if (course.UserId != userId)
        {
            throw new UnauthorizedException(message);
        }
    }
}
