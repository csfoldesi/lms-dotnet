using Application.Categories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CategoriesController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> List()
    {
        var result = await Mediator.Send(new List.Query { });
        return HandleResult(result);
    }
}
