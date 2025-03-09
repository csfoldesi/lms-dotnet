namespace API.Dto;

public class ChapterReorderRequest
{
    public required List<Guid> ChapterIdList { get; set; }
}
