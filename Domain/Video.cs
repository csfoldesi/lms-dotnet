namespace Domain;

public class Video : BaseEntity
{
    public required string Url { get; set; }
    public string? PublicId { get; set; }

    public Guid ChapterId { get; set; }
    public required Chapter Chapter { get; set; }
}
