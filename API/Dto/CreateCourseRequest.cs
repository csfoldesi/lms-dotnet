namespace API.Dto
{
    public class CreateCourseRequest
    {
        public required string UserId { get; set; }
        public required string Title { get; set; }
    }
}
