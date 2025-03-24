using Application.Payment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PaymentController : BaseApiController
{
    [HttpPost("{Id:guid}/checkout")]
    public async Task<IActionResult> Checkout(Guid Id)
    {
        var result = await Mediator.Send(new CreateCheckoutSession.Command { CourseId = Id });
        return HandleResult(result);
    }

    [HttpPost("webhook"), AllowAnonymous]
    public async Task<IActionResult> StripeWebhook()
    {
        try
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            // Suppress Sonar warning - webhook signature verification requires raw request data
#pragma warning disable S6932 // Use model binding instead of reading raw request data
            await Mediator.Send(
                new WebHook.Command
                {
                    Request = json,
                    Signature = Request.Headers["Stripe-Signature"]!,
                }
            );
        }
        catch (Exception)
        {
            //TODO: log errors
        }
        return Ok();
    }
}
