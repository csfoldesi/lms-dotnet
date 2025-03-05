namespace Domain
{
    public class StripeCustomer : BaseEntity
    {
        public required string UserId { get; set; }
        public required string StripeCustomerId { get; set; }
    }
}
