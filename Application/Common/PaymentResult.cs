namespace Application.Common;

public class PaymentResult
{
    public Guid? CourseId { get; set; }

    public string? UserId { get; set; }

    public bool IsSuccess { get; set; }
}
