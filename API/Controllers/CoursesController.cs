using API.Dto;
using Application.Courses;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CoursesController : BaseApiController
    {
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
    }
}
