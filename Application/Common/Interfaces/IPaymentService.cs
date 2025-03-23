namespace Application.Common.Interfaces;

public interface IPaymentService
{
    Task<string> CreateCheckoutSessionAsync(
        string Name,
        string Description,
        float Price,
        Guid CourseId,
        string UserId
    );
}
