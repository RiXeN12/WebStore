using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using webstore_back.DAL.Repositories.UserRepository;
using webstore_back.DAL;
using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.ViewModels;
using webstore_back.BLL.Services.MailService;
using webstore_back.BLL.Services.JwtService;
using webstore_back.BLL.Services;

namespace webstore_back.BLL.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IMailService _mailService;
        private readonly IJwtService _jwtService;

        public AccountService(UserManager<User> userManager, IUserRepository userRepository, IMailService mailService, IJwtService jwtService)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _mailService = mailService;
            _jwtService = jwtService;
        }

        public async Task<ServiceResponse> EmailConfirmAsync(string id, string token)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                return ServiceResponse.BadRequestResponse("Користувача не знайдено");
            }

            var bytes = WebEncoders.Base64UrlDecode(token);
            var validToken = Encoding.UTF8.GetString(bytes);

            var result = await _userRepository.ConfirmEmailAsync(user, validToken);

            if (!result.Succeeded)
            {
                return ServiceResponse.BadRequestResponse(result.Errors.First().Description);
            }

            return ServiceResponse.OkResponse("Пошта успішно підтверджена");
        }

        public async Task<ServiceResponse> SignInAsync(SignInVM model)
        {
            var user = await _userRepository.GetByEmailAsync(model.Email, true);

            if (user == null)
            {
                return ServiceResponse.BadRequestResponse($"Користувача з поштою {model.Email} не знайдено");
            }

            var result = await _userRepository.CheckPasswordAsync(user, model.Password);

            if (!result)
            {
                return ServiceResponse.BadRequestResponse($"Пароль вказано невірно");
            }

            var tokens = await _jwtService.GenerateTokensAsync(user);

            if(!tokens.Success)
            {
                return ServiceResponse.BadRequestResponse("Не вдалося згенерувати токени");
            }

            return ServiceResponse.OkResponse("Успіший вхід", tokens.Payload);
        }

        public async Task<ServiceResponse> SignUpAsync(SignUpVM model)
        {
            if (!await _userRepository.IsUniqueUserNameAsync(model.UserName))
            {
                return ServiceResponse.BadRequestResponse($"{model.UserName} вже викорстовується");
            }

            if (!await _userRepository.IsUniqueEmailAsync(model.Email))
            {
                return ServiceResponse.BadRequestResponse($"{model.Email} вже викорстовується");
            }

            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.UserName,
                NormalizedEmail = model.Email.ToUpper(),
                NormalizedUserName = model.UserName.ToUpper()
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return ServiceResponse.BadRequestResponse(result.Errors.First().Description);
            }

            await _userManager.AddToRoleAsync(user, Settings.UserRole);

            await SendConfirmEmailAsync(user);

            var tokens = await _jwtService.GenerateTokensAsync(user);

            if (!tokens.Success)
            {
                return ServiceResponse.BadRequestResponse("Не вдалося згенерувати токени");
            }

            return ServiceResponse.OkResponse($"Користувач {model.Email} успішно зареєстрований", tokens.Payload);
        }

        private async Task SendConfirmEmailAsync(User user)
        {
            string token = await _userRepository.GenerateEmailConfirmationTokenAsync(user);
            await _mailService.SendConfirmEmailAsync(user, token);
        }


    }
}
