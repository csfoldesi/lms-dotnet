using Application.Courses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers;

public class PaymentController : BaseApiController
{
    private readonly string _webhookSecret;

    public PaymentController(IConfiguration configuration)
    {
        _webhookSecret = configuration["StripeSettings:WebhookSecret"]!;
    }

    [HttpPost("{Id:guid}/checkout"), AllowAnonymous]
    public async Task<IActionResult> Checkout(Guid Id)
    {
        var result = await Mediator.Send(new Enroll.Command { Id = Id });
        return HandleResult(result);
    }

    [HttpPost("webhook"), AllowAnonymous]
    public async Task<IActionResult> Webhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        try
        {
            var stripeEvent = EventUtility.ConstructEvent(
                json,
                Request.Headers["Stripe-Signature"],
                _webhookSecret
            );

            // Handle specific event types
            /*switch (stripeEvent.Type)
            {
                case Events.PaymentIntentSucceeded:
                    var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    // Handle successful payment
                    Console.WriteLine($"Payment succeeded for {paymentIntent.Amount}!");
                    // Update order in database, send confirmation email, etc.
                    break;

                case Events.PaymentIntentPaymentFailed:
                    paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    // Handle failed payment
                    Console.WriteLine($"Payment failed for {paymentIntent.Amount}!");
                    break;

                default:
                    Console.WriteLine($"Unhandled event type: {stripeEvent.Type}");
                    break;
            }*/

            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }
}
