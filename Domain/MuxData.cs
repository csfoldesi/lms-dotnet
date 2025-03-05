namespace Domain
{
    public class MuxData : BaseEntity
    {
        public required string AssetId { get; set; }
        public string? PlaybackId { get; set; }

        public Guid ChapterId { get; set; }
        public required Chapter Chapter { get; set; }
    }
}
