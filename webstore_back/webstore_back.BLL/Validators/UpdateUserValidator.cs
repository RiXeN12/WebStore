using FluentValidation;
using webstore_back.DAL.ViewModels;

namespace webstore_back.BLL.Validators;

public class UpdateUserValidator : AbstractValidator<UpdateUserVM>
{
    public UpdateUserValidator()
    {
        // RuleFor(m => m.Email)
        //     .EmailAddress().WithMessage("Невірний формат пошти")
        //     .NotEmpty().WithMessage("Вкажіть пошту");
        RuleFor(m => m.UserName)
            .NotEmpty().WithMessage("Вкажіть ім'я користувача");
        RuleFor(m => m.Role)
            .NotEmpty().WithMessage("Вкажіть роль");
        RuleFor(m => m.FirstName)
            .NotEmpty().WithMessage("Вкажіть ім'я");
        RuleFor(m => m.LastName)
            .NotEmpty().WithMessage("Вкажіть прізвище");
    }
}