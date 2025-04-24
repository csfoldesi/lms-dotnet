using API.Dto;
using Application.Courses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class CoursesController : BaseApiController
{
    [HttpGet, AllowAnonymous]
    public async Task<IActionResult> ListPublished([FromQuery] CourseSearchRequest request)
    {
        var result = await Mediator.Send(
            new ListPublished.Query { Categories = request.Categories, Title = request.Title }
        );
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
    [HttpGet("teacher")]
    public async Task<IActionResult> ListOwned([FromQuery] CourseSearchRequest request)
    {
        var result = await Mediator.Send(
            new ListOwned.Query { Categories = request.Categories, Title = request.Title }
        );
        return HandleResult(result);
    }

    [HttpGet("purchased")]
    public async Task<IActionResult> ListPurchased()
    {
        var result = await Mediator.Send(new ListPurchased.Query { });
        return HandleResult(result);
    }

    [HttpGet("{Id:guid}"), AllowAnonymous]
    public async Task<IActionResult> Get(Guid Id)
    {
        var result = await Mediator.Send(new Get.Query { Id = Id });
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
    [HttpGet("{Id:guid}/teacher")]
    public async Task<IActionResult> GetOwned(Guid Id)
    {
        var result = await Mediator.Send(new GetOwned.Query { Id = Id });
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
    [HttpPost]
    public async Task<IActionResult> Create(CourseCreateRequest request)
    {
        var result = await Mediator.Send(
            new Create.Command { UserId = request.UserId, Title = request.Title }
        );
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
    [HttpPost("{Id}/chapters/")]
    public async Task<IActionResult> CreateChapter(Guid Id, [FromBody] ChapterCreateRequest request)
    {
        var result = await Mediator.Send(
            new Application.Chapters.Create.Command { CourseId = Id, Title = request.Title }
        );
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
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

    [Authorize(Roles = "Teacher")]
    [HttpDelete("{Id}")]
    public async Task<IActionResult> Delete(Guid Id)
    {
        var result = await Mediator.Send(new Delete.Command { Id = Id });
        return HandleResult(result);
    }

    [Authorize(Roles = "Teacher")]
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
}
