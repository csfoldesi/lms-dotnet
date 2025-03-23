namespace Infrastructure.Payment.Settings;

public class StripeSettings
{
    public required string SecretKey { get; set; }
    public required string PublishableKey { get; set; }
    public required string WebhookSecret { get; set; }
    public required string ReturnUrl { get; set; }
}
