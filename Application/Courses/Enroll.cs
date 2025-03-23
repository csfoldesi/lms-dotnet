using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class Enroll
{
    public class Command : IRequest<Result<string>>
    {
        public required Guid Id { get; set; }
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
                .Courses.Where(c => c.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            Helper.AssertIsNotNull(course);

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
