using Microsoft.AspNetCore.Mvc;
using webstore_back.DAL.ViewModels;
using webstore_back.BLL.Services.AccountService;
using webstore_back.BLL.Services.JwtService;
using webstore_back.BLL.Services;
using webstore_back.BLL.Validators;

namespace webstore_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountService;
        private readonly IJwtService _jwtService;

        public AccountController(IAccountService accountService, IJwtService jwtService)
        {
            _accountService = accountService;
            _jwtService = jwtService;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignInAsync([FromBody] SignInVM model)
        {
            var validator = new SignInValidator();
            var validation = await validator.ValidateAsync(model);

            if (!validation.IsValid)
            {
                return BadRequest(validation.Errors);
            }

            var response = await _accountService.SignInAsync(model);

            return GetResult(response);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUpAsync([FromBody] SignUpVM model)
        {
            var validator = new SignUpValidator();
            var validation = await validator.ValidateAsync(model);

            if (!validation.IsValid)
            {
                return BadRequest(validation.Errors);
            }

            var response = await _accountService.SignUpAsync(model);
            return GetResult(response);
        }

        [HttpGet("email-confirm")]
        public async Task<IActionResult> EmailConfirmAsync(string u, string t)
        {
            if (string.IsNullOrEmpty(u) || string.IsNullOrEmpty(t))
            {
                return NotFound();
            }

            var response = await _accountService.EmailConfirmAsync(u, t);
            return GetResult(response);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshTokensAsync([FromBody] JwtVM model)
        {
            if(string.IsNullOrEmpty(model.AccessToken) ||
                string.IsNullOrEmpty(model.RefreshToken))
            {
                return GetResult(ServiceResponse.BadRequestResponse("Invalid tokens"));
            }

            var response = await _jwtService.RefreshTokensAsync(model);
            return GetResult(response);
        }
    }
}
