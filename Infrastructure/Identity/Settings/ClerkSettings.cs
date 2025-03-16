namespace Infrastructure.Identity.Settings;

public class ClerkSettings
{
    public required string Authority { get; set; }
    public required string Issuer { get; set; }
    public required string JwksUrl { get; set; }
}
