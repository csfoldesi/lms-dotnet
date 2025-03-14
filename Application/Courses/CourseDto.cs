using Application.Chapters;
using Domain;

namespace Application.Courses
{
    public class CourseDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public float Price { get; set; }
        public bool IsPublished { get; set; }

        public Guid? CategoryId { get; set; }
        public string? Category { get; set; }

        public List<ChapterDto> Chapters { get; set; } = [];

        public List<AttachmentDto> Attachments { get; set; } = [];
    }
}
