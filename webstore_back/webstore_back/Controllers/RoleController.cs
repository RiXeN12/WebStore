using Microsoft.AspNetCore.Mvc;
using webstore_back.DAL.ViewModels;
using webstore_back.BLL.Services;
using webstore_back.BLL.Services.RoleService;
using webstore_back.Controllers;
namespace webstore_back.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoleController : BaseController
{
    private readonly IRoleService _roleService;

    public RoleController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAsync([FromQuery] string? id, string? name)
    {
        id = Request.Query[nameof(id)];
        name = Request.Query[nameof(name)];

        if (id == null && name == null)
        {
            var response = await _roleService.GetAllAsync();
            return GetResult(response);
        }

        if (!string.IsNullOrWhiteSpace(id))
        {
            var response = await _roleService.GetByIdAsync(id);

            if(response.Success)
            {
                return GetResult(response);
            }
        }
        if (!string.IsNullOrWhiteSpace(name))
        {
            var response = await _roleService.GetByNameAsync(name);

            if (response.Success)
            {
                return GetResult(response);
            }
        }

        return GetResult(ServiceResponse.BadRequestResponse("Не вдалося отримати роль"));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAsync(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return GetResult(ServiceResponse.BadRequestResponse("id ролі не може бути порожнім"));
        }

        var response = await _roleService.DeleteAsync(id);
        return GetResult(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsync(RoleVM model)
    {
        if (string.IsNullOrEmpty(model.Name))
        {
            return GetResult(ServiceResponse.BadRequestResponse("Ім'я ролі не може бути порожнім"));
        }

        var response = await _roleService.CreateAsync(model);
        return GetResult(response);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAsync(RoleVM model)
    {
        if (string.IsNullOrEmpty(model.Name))
        {
            return GetResult(ServiceResponse.BadRequestResponse("Ім'я ролі не може бути порожнім"));
        }

        if (string.IsNullOrEmpty(model.Id))
        {
            return GetResult(ServiceResponse.BadRequestResponse("Id ролі не може бути порожнім"));
        }

        var response = await _roleService.UpdateAsync(model);
        return GetResult(response);
    }
}
