using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Payment;

public class CreateCheckoutSession
{
    public class Command : IRequest<Result<string>>
    {
        public required Guid CourseId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<string>>
    {
        private readonly IDataContext _dataContext;
        private readonly IUser _user;
        private readonly IPaymentService _paymentService;

        public Handler(IDataContext dataContext, IUser user, IPaymentService paymentService)
        {
            _dataContext = dataContext;
            _user = user;
            _paymentService = paymentService;
        }

        public async Task<Result<string>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var course = await _dataContext
                .Courses.Where(c => c.Id == request.CourseId)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            Helper.AssertIsNotNull(course);

            var alreadyPurchased = await _dataContext.Purchases.AnyAsync(
                p => p.CourseId == request.CourseId && p.UserId == _user.Id,
                cancellationToken: cancellationToken
            );
            if (alreadyPurchased)
            {
                return Result<string>.Failure("Already purchased course");
            }

            var result = await _paymentService.CreateCheckoutSessionAsync(
                course!.Title,
                course.Description!,
                course.Price ?? 0,
                course.Id,
                _user.Id!
            );

            return string.IsNullOrEmpty(result)
                ? Result<string>.Failure("Unable to create checkout session")
                : Result<string>.Success(result);
        }
    }
}
