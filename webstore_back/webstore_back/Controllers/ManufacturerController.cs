using Microsoft.AspNetCore.Mvc;
using webstore_back.BLL.Services;
using webstore_back.BLL.Services.ManufacturerService;
using webstore_back.BLL.Validators;
using webstore_back.DAL.ViewModels.ProductManagementVMs.Manufacturer;

namespace webstore_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManufacturerController : BaseController
    {
        private readonly IManufacturerService _manufacturerService;

        public ManufacturerController(IManufacturerService manufacturerService)
        {
            _manufacturerService = manufacturerService;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllAsync()
        {
            var response = await _manufacturerService.GetAllAsync();
            return GetResult(response);
        }

        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetByIdAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id виробника не може бути порожнім"));
            }

            var response = await _manufacturerService.GetByIdAsync(id);
            return GetResult(response);
        }

        [HttpGet("get-by-name")]
        public async Task<IActionResult> GetByNameAsync(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Назва виробника не може бути порожньою"));
            }

            var response = await _manufacturerService.GetByNameAsync(name);
            return GetResult(response);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateManufacturerAsync(CreateManufacturerVM model)
        {
            if (string.IsNullOrEmpty(model.Name))
            {
                return GetResult(ServiceResponse.BadRequestResponse("Name can't be empty."));
            }

            var response = await _manufacturerService.CreateManufacturerAsync(model);
            return GetResult(response);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateManufacturerAsync(ManufacturerVM model)
        {
            var validator = new ManufacturerVMValidator();
            var validateResult = await validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return BadRequest(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }

            var response = await _manufacturerService.UpdateManufacturerAsync(model);
            return GetResult(response);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteManufacturerAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id виробника не може бути порожнім"));
            }

            var response = await _manufacturerService.DeleteManufacturerAsync(id);
            if (response.Success)
            {
                return GetResult(response);
            }

            return BadRequest(ServiceResponse.BadRequestResponse("Виробника не видалено."));
        }
    }
}