using Application.Common.Interfaces;
using Infrastructure.Payment.Settings;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace Infrastructure.Payment;

public class StripeService : IPaymentService
{
    private readonly string _returnUrl;

    public StripeService(IOptions<StripeSettings> config)
    {
        _returnUrl = config.Value.ReturnUrl;
        StripeConfiguration.ApiKey = config.Value.SecretKey;
    }

    public async Task<string> CreateCheckoutSessionAsync(
        string Name,
        string Description,
        float Price,
        Guid CourseId,
        string UserId
    )
    {
        try
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems =
                [
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = (long?)(Price * 100),
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = Name,
                                Description = Description,
                            },
                        },
                        Quantity = 1,
                    },
                ],
                Mode = "payment",
                SuccessUrl = $"{_returnUrl}/courses/{CourseId}?success=1",
                CancelUrl = $"{_returnUrl}/courses/{CourseId}?cancelled=1",
                Metadata = new Dictionary<string, string>
                {
                    { "courseId", CourseId.ToString() },
                    { "userId", UserId },
                },
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return session.Id;
        }
        catch (StripeException)
        {
            return string.Empty;
        }
    }
}
