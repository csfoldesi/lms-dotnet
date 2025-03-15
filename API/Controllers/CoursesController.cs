using API.Dto;
using Application.Courses;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CoursesController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> List([FromQuery] CourseSearchRequest request)
    {
        var result = await Mediator.Send(
            new List.Query { CategoryId = request.CategoryId, Title = request.Title }
        );
        return HandleResult(result);
    }

    [HttpGet("{Id}")]
    public async Task<IActionResult> Get(Guid Id)
    {
        var result = await Mediator.Send(new Get.Query { Id = Id });
        return HandleResult(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CourseCreateRequest request)
    {
        var result = await Mediator.Send(
            new Create.Command { UserId = request.UserId, Title = request.Title }
        );
        return HandleResult(result);
    }

    [HttpPost("{Id}/chapters/")]
    public async Task<IActionResult> CreateChapter(Guid Id, [FromBody] ChapterCreateRequest request)
    {
        var result = await Mediator.Send(
            new Application.Chapters.Create.Command { CourseId = Id, Title = request.Title }
        );
        return HandleResult(result);
    }

    [HttpPut("{Id}/chapters/")]
    public async Task<IActionResult> ReorderChapters(
        Guid Id,
        [FromBody] ChapterReorderRequest request
    )
    {
        var result = await Mediator.Send(
            new Application.Chapters.Reorder.Command
            {
                CourseID = Id,
                ChapterIdList = request.ChapterIdList,
            }
        );
        return HandleResult(result);
    }

    [HttpDelete("{Id}")]
    public async Task<IActionResult> Delete(Guid Id)
    {
        var result = await Mediator.Send(new Delete.Command { Id = Id });
        return HandleResult(result);
    }

    [HttpPatch("{Id}")]
    public async Task<IActionResult> Modify(Guid Id, [FromBody] CourseModifyRequest request)
    {
        var result = await Mediator.Send(
            new Modify.Command
            {
                Id = Id,
                Title = request.Title,
                Description = request.Description,
                ImageUrl = request.ImageUrl,
                Price = request.Price,
                CategoryId = request.CategoryId,
            }
        );
        return HandleResult(result);
    }

    [HttpPatch("{Id}/publish")]
    public async Task<IActionResult> Publish(Guid Id)
    {
        var result = await Mediator.Send(new Publish.Command { Id = Id });
        return HandleResult(result);
    }

    [HttpPatch("{Id}/unpublish")]
    public async Task<IActionResult> Unpublish(Guid Id)
    {
        var result = await Mediator.Send(new Unpublish.Command { Id = Id });
        return HandleResult(result);
    }
}
