using Microsoft.AspNetCore.Mvc;
using webstore_back.BLL.Services;

namespace webstore_back.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected IActionResult GetResult(ServiceResponse serviseResponse)
        {
            return StatusCode((int)serviseResponse.StatusCode, serviseResponse);  
        }
    }
}
