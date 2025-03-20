using FluentValidation;
using webstore_back.DAL.ViewModels.ProductManagementVMs.ClothingItem;

namespace webstore_back.BLL.Validators.ClothingItem
{
    public class UpdateClothingItemVMValidator : AbstractValidator<ClothingItemVM>
    {
        public UpdateClothingItemVMValidator()
        {
            RuleFor(m => m.Id)
                .NotEmpty().WithMessage("Вкажіть id.");
            RuleFor(m => m.Name)
                .MaximumLength(50).WithMessage("Максимальна довжина назви 50 символів.")
                .NotEmpty().WithMessage("Вкажіть назву.");
            RuleFor(m => m.Price)
                .GreaterThan(0).WithMessage("Ціна повинна бути більше 0.");
            RuleFor(x => x.Description)
                .MaximumLength(80).WithMessage("Максимальна довжина опису 80 символівю");
            RuleFor(m => m.StockQuantity)
                .GreaterThan(0).WithMessage("Мінімальна кількість = 1");
            RuleFor(m => m.ManufacturerId)
                .NotEmpty().WithMessage("Вкажіть виробника.");
        }
    }
}
