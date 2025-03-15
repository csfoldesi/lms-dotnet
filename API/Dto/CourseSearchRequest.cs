namespace API.Dto;

public class CourseSearchRequest
{
    public Guid? CategoryId { get; set; }
    public string? Title { get; set; }
}
