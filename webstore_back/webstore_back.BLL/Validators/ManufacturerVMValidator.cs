using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using webstore_back.DAL.ViewModels.ProductManagementVMs;
using webstore_back.DAL.ViewModels.ProductManagementVMs.Manufacturer;

namespace webstore_back.BLL.Validators
{
    public class ManufacturerVMValidator : AbstractValidator<ManufacturerVM>
    {
        public ManufacturerVMValidator()
        {
            RuleFor(m => m.Name)
                .MaximumLength(50).WithMessage("Максимальна довжина імені 50 символів.")
                .NotEmpty().WithMessage("Вкажіть ім'я.");
            // RuleFor(m => m.Rating)
            //     .ExclusiveBetween(0,10).WithMessage("Рейтинг повинен бути від 0 до 10.");
        }
    }
}
