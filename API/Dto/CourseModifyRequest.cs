namespace API.Dto;

public class CourseModifyRequest
{
    public string? UserId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public float? Price { get; set; }
    public Guid? CategoryId { get; set; }
}
