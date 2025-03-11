namespace Domain
{
    public class Attachment : BaseEntity
    {
        public required string Name { get; set; }
        public required string Url { get; set; }

        public Guid CourseId { get; set; }
        public required Course Course { get; set; }

        public string? PublicId { get; set; }
    }
}
