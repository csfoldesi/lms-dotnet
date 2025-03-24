namespace Application.Chapters;

public class ChapterDto
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public string? VideoUrl { get; set; }
    public int Position { get; set; }
    public bool IsPublished { get; set; }
    public bool IsFree { get; set; }
    public Guid? NextChapterId { get; set; }
    public bool IsCompleted { get; set; }
}
