namespace API.Dto;

public class CourseSearchRequest
{
    public Guid[]? Categories { get; set; }
    public string? Title { get; set; }
}
