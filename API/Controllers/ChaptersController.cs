using API.Dto;
using Application.Chapters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class ChaptersController : BaseApiController
{
    [HttpGet("{Id}"), AllowAnonymous]
    public async Task<IActionResult> Get(Guid Id)
    {
        var result = await Mediator.Send(new Get.Query { Id = Id });
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
    [HttpPatch("{Id}")]
    public async Task<IActionResult> Modify(Guid Id, [FromBody] ChapterModifyRequest request)
    {
        var result = await Mediator.Send(
            new Modify.Command
            {
                Id = Id,
                Title = request.Title,
                Description = request.Description,
                VideoUrl = request.VideoUrl,
                IsFree = request.IsFree,
            }
        );
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
    [HttpDelete("{Id}")]
    public async Task<IActionResult> Delete(Guid Id)
    {
        var result = await Mediator.Send(new Delete.Command { Id = Id });
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
    [HttpPatch("{Id}/publish")]
    public async Task<IActionResult> Publish(Guid Id)
    {
        var result = await Mediator.Send(new Publish.Command { Id = Id });
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
    [HttpPatch("{Id}/unpublish")]
    public async Task<IActionResult> Unpublish(Guid Id)
    {
        var result = await Mediator.Send(new Unpublish.Command { Id = Id });
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
    [HttpPut("{Id}/progress")]
    public async Task<IActionResult> ToggleProgress(
        Guid Id,
        [FromBody] ToggleProgressRequest progressToggleRequest
    )
    {
        var result = await Mediator.Send(
            new ToggleProgress.Command
            {
                ChapterId = Id,
                IsCompleted = progressToggleRequest.IsCompleted,
            }
        );
        return HandleResult(result);
    }
}
