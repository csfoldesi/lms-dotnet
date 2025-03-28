using Application.Analytics;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AnalyticsController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await Mediator.Send(new Get.Query { });
        return HandleResult(result);
    }
}
