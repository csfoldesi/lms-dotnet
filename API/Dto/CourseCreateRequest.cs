namespace API.Dto
{
    public class CourseCreateRequest
    {
        public required string UserId { get; set; }
        public required string Title { get; set; }
    }
}
