namespace Domain
{
    public class UserProgress : BaseEntity
    {
        public required string UserId { get; set; }

        public Guid ChapterId { get; set; }
        public required Chapter Chapter { get; set; }

        public bool IsCompleted { get; set; }
    }
}
