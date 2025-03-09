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
}
