namespace Infrastructure.Identity.Settings;

public class Auth0Settings
{
    public required string Authority { get; set; }
    public required string Audience { get; set; }
    public required string Issuer { get; set; }
}
