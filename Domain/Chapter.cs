namespace Domain
{
    public class Chapter : BaseEntity
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public int Position { get; set; }
        public bool IsPublished { get; set; }
        public bool IsFree { get; set; }

        public Guid CourseId { get; set; }
        public required Course Course { get; set; }

        public ICollection<UserProgress> UserProgresses { get; set; } = [];

        public Video? Video { get; set; }
    }
}
