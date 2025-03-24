using Application.Common;
using Application.Common.Interfaces;
using Infrastructure.Payment.Settings;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace Infrastructure.Payment;

public class StripeService : IPaymentService
{
    private readonly string _returnUrl;
    private readonly string _webhookSecret;

    public StripeService(IOptions<StripeSettings> config)
    {
        _returnUrl = config.Value.ReturnUrl;
        _webhookSecret = config.Value.WebhookSecret;
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
                PaymentMethodTypes = ["card"],
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

    public PaymentResult HandleWebHook(string Result, string Signature)
    {
        try
        {
            var stripeEvent = EventUtility.ConstructEvent(Result, Signature, _webhookSecret);
            switch (stripeEvent.Type)
            {
                case "checkout.session.completed":
                    Session? session = stripeEvent.Data.Object as Session;
                    if (session != null && session.Metadata != null)
                    {
                        var courseId = session.Metadata.GetValueOrDefault("courseId");
                        var userId = session.Metadata.GetValueOrDefault("userId");
                        if (!string.IsNullOrEmpty(courseId) && !string.IsNullOrEmpty(userId))
                        {
                            return new PaymentResult
                            {
                                CourseId = Guid.Parse(courseId),
                                UserId = userId,
                                IsSuccess = true,
                            };
                        }
                    }
                    break;
                default:
                    return new PaymentResult { IsSuccess = true };
            }
        }
        catch (StripeException)
        {
            return new PaymentResult { IsSuccess = false };
        }
        return new PaymentResult { IsSuccess = true };
    }
}
