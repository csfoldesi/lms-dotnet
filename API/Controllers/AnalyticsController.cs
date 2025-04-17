using Application.Analytics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class AnalyticsController : BaseApiController
{
    [HttpGet]
    [Authorize(Roles = "Teacher")]
    public async Task<IActionResult> Get()
    {
        var result = await Mediator.Send(new Get.Query { });
        return HandleResult(result);
    }
}
