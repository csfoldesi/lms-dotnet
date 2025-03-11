using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UploadController : BaseApiController
{
    [HttpPost("courses/{Id}")]
    public async Task<IActionResult> AddCourseImage(Guid Id, [FromForm] IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        var result = await Mediator.Send(
            new Application.Courses.AddImage.Command
            {
                Id = Id,
                FileName = file.FileName,
                Content = memoryStream.ToArray(),
            }
        );
        return HandleResult(result);
    }
}
