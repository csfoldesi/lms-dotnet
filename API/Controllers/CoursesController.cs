using API.Dto;
using Application.Courses;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CoursesController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Create(CreateCourseRequest request)
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
    }
}
