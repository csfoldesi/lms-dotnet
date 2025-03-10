using API.Dto;
using Application.Chapters;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ChaptersController : BaseApiController
{
    [HttpGet("{Id}")]
    public async Task<IActionResult> Get(Guid Id)
    {
        var result = await Mediator.Send(new Get.Query { Id = Id });
        return HandleResult(result);
    }

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
}
