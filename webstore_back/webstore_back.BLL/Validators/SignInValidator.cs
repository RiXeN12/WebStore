using FluentValidation;
using webstore_back.DAL;
using webstore_back.DAL.ViewModels;

namespace webstore_back.BLL.Validators
{
    public class SignInValidator : AbstractValidator<SignInVM>
    {
        public SignInValidator() 
        {
            RuleFor(m => m.Email)
                .EmailAddress().WithMessage("Невірний формат пошти")
                .NotEmpty().WithMessage("Вкажіть пошту");
            RuleFor(m => m.Password)
                .MinimumLength(Settings.PasswordLength).WithMessage("Мінімальна довжина паролю 6 символів");
        }
    }
}
