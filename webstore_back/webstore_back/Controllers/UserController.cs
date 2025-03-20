using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using webstore_back.BLL.Services;
using webstore_back.BLL.Services.ImageService;
using webstore_back.BLL.Services.UserService;
using webstore_back.BLL.Validators;
using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.ViewModels;

namespace webstore_back.Controllers
{
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    //[Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    public class UserController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IImageService _imageService;

        public UserController(UserManager<User> userManager, IUserService userService, IWebHostEnvironment webHostEnvironment, IImageService imageService)
        {
            _userManager = userManager;
            _userService = userService;
            _webHostEnvironment = webHostEnvironment;
            _imageService = imageService;
        }

        //[HttpPost("image")]
        //public async Task<IActionResult> AddImageFromUserAsync([FromBody] UserImageVM model)
        //{
        //    var response = await _imageService.SaveImageFromBase64Async(Settings.UserImagesPath, model.Base64Image);

        //    if (response.Success)
        //    {
        //        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == model.UserId);

        //        if (user != null)
        //        {
        //            user.Image = response.Payload.ToString();
        //            await _userManager.UpdateAsync(user);
        //        }
        //    }                                       

        //    return Ok();
        //}

        [AllowAnonymous] // даний метод не потребує авторизації
        [HttpPost("image")]
        public async Task<IActionResult> AddImageFromUserAsync([FromForm] UserImageVM model)
        {
            if(string.IsNullOrEmpty(model.UserId) || model.Image == null)
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Некоректні дані"));
            }

            var response = await _userService.AddImageFromUserAsync(model);

            return GetResult(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserAsync([FromQuery] string? role, string? id, string? email, string? userName)
        {
            id = Request.Query[nameof(id)];
            userName = Request.Query[nameof(userName)];
            email = Request.Query[nameof(email)];
            role = Request.Query[nameof(role)];

            if (role != null)
            {
                var response = await _userService.GetUsersByRoleAsync(role);
                return GetResult(response);
            }

            if (!string.IsNullOrEmpty(id))
            {
                var response = await _userService.GetByIdAsync(id);
                if (response.Success)
                {
                    return GetResult(response);
                }
            }
            
            if (!string.IsNullOrEmpty(email))
            {
                var response = await _userService.GetByEmailAsync(email);
                if (response.Success)
                {
                    return GetResult(response);
                }
            }
            
            if (!string.IsNullOrEmpty(userName))
            {
                var response = await _userService.GetByUserNameAsync(userName);
                if (response.Success)
                {
                    return GetResult(response);
                }
            }

            try
            {
                var response = await _userService.GetAllAsync();
                
                return GetResult(response);
            }
            catch (Exception e)
            {
                return GetResult(ServiceResponse.BadRequestResponse("Не вдалося отримати користувача"));
            }
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsersAsync(int page, int size)
        {
            var response = await _userService.GetAllAsync(page, size);
            return GetResult(response);
        }
        
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return GetResult(ServiceResponse.BadRequestResponse("Невірний формат id"));
            }

            var response = await _userService.DeleteAsync(id);
            return GetResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CreateUserVM model)
        {
            var validator = new CreateUserValidator();
            var validateResult = await validator.ValidateAsync(model);

            if(!validateResult.IsValid)
            {
                return GetResult(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }

            var response = await _userService.CreateAsync(model);

            return GetResult(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync(UpdateUserVM model)
        {
            var validator = new UpdateUserValidator();
            var validateResult = await validator.ValidateAsync(model);

            if (!validateResult.IsValid)
            {
                return GetResult(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }

            var response = await _userService.UpdateAsync(model);

            return GetResult(response);
        }
    }
}
