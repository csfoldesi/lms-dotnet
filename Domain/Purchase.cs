namespace Domain
{
    public class Purchase : BaseEntity
    {
        public required string UserId { get; set; }

        public Guid CourseId { get; set; }
        public required Course Course { get; set; }
    }
}
