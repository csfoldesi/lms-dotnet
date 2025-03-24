using Application.Common;
using Application.Common.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Payment;

public class WebHook
{
    public class Command : IRequest<Result<string>>
    {
        public required string Request { get; set; }
        public required string Signature { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<string>>
    {
        private readonly IDataContext _dataContext;
        private readonly IPaymentService _paymentService;

        public Handler(IDataContext dataContext, IPaymentService paymentService)
        {
            _dataContext = dataContext;
            _paymentService = paymentService;
        }

        public async Task<Result<string>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var result = _paymentService.HandleWebHook(request.Request, request.Signature);
            if (!result.IsSuccess)
            {
                return Result<string>.Failure("Payment problem");
            }
            if (result.CourseId == null || string.IsNullOrEmpty(result.UserId))
            {
                return Result<string>.Success("OK");
            }

            // TODO: if tehre is an error in the following part, that should be handle locally
            // do not send error repsonse back to Stripe

            var course = await _dataContext
                .Courses.Where(c => c.Id == result.CourseId)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);
            Helper.AssertIsNotNull(course, "Course not found");

            var purchase = new Purchase
            {
                Id = Guid.NewGuid(),
                Course = course!,
                UserId = result.UserId!,
            };

            _dataContext.Purchases.Add(purchase);

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<string>.Success("OK");
            }
            catch (Exception)
            {
                return Result<string>.Failure("Unable to purchase the Course");
            }
        }
    }
}
