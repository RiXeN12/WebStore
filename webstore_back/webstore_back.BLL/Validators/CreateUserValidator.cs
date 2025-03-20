using FluentValidation;
using webstore_back.DAL.ViewModels;
using webstore_back.DAL;

namespace webstore_back.BLL.Validators
{
    public class CreateUserValidator : AbstractValidator<CreateUserVM>
    {
        public CreateUserValidator() 
        {
            RuleFor(m => m.Email)
                .EmailAddress().WithMessage("Невірний формат пошти")
                .NotEmpty().WithMessage("Вкажіть пошту");
            RuleFor(m => m.UserName)
                .NotEmpty().WithMessage("Вкажіть ім'я користувача");
            RuleFor(m => m.Password)
                .MinimumLength(Settings.PasswordLength).WithMessage("Мінімальна довжина паролю 6 символів");
            RuleFor(m => m.Role)
                .NotEmpty().WithMessage("Вкажіть роль");
        }
    }
}
