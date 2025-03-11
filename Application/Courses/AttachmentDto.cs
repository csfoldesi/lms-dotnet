namespace Application.Courses;

public class AttachmentDto
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Url { get; set; }
}
