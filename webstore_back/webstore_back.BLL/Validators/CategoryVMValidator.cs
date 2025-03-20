using FluentValidation;
using webstore_back.DAL.ViewModels.ProductManagementVMs.Category;

namespace webstore_back.BLL.Validators
{
    public class CategoryVMValidator : AbstractValidator<CategoryVM>
    {
        public CategoryVMValidator() 
        {
            RuleFor(x => x.Name)
                .MaximumLength(50).WithMessage("Максимальна довжина назви 50 символів.")
                .NotEmpty().WithMessage("Вкажіть назву.");
        }
    }
}
