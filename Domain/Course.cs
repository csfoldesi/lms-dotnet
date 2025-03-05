namespace Domain
{
    public class Course : BaseEntity
    {
        public required string Name { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public float Price { get; set; }
        public bool IsPublished { get; set; }

        public Guid? CategoryId { get; set; }
        public Category? Category { get; set; }

        public ICollection<Chapter> Chapters { get; set; } = [];

        public ICollection<Attachment> Attachments { get; set; } = [];

        public ICollection<Purchase> Purchases { get; set; } = [];
    }
}
