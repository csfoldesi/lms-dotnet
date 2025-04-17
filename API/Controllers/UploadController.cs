using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UploadController : BaseApiController
{
    [Authorize(Roles = "Teacher")]
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

    [Authorize(Roles = "Teacher")]
    [HttpPost("courses/{Id}/attachments")]
    public async Task<IActionResult> AddCourseAttachment(Guid Id, [FromForm] IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        var result = await Mediator.Send(
            new Application.Courses.AddAttachment.Command
            {
                Id = Id,
                FileName = file.FileName,
                Content = memoryStream.ToArray(),
            }
        );
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
    [HttpPost("chapters/{Id}")]
    public async Task<IActionResult> AddChapterVideo(Guid Id, [FromForm] IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        var result = await Mediator.Send(
            new Application.Chapters.AddVideo.Command
            {
                Id = Id,
                FileName = file.FileName,
                ContentType = file.ContentType,
                Content = memoryStream.ToArray(),
            }
        );
        return HandleResult(result);
    }
}
