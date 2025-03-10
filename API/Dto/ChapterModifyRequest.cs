using Domain;

namespace API.Dto;

public class ChapterModifyRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? VideoUrl { get; set; }
    public bool? IsFree { get; set; }
}
