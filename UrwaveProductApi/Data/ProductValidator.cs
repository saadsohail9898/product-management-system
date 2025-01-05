//using FluentValidation;
//using UrwaveProductApi.DTOs;

//namespace UrwaveProductApi.Data
//{
//    public class ProductValidator : AbstractValidator<CreateProductDto>
//    {
//        public ProductValidator()
//        {
//            RuleFor(p => p.Name).NotEmpty().MaximumLength(100);
//            RuleFor(p => p.Description).NotEmpty().MaximumLength(500);
//            RuleFor(p => p.Price).GreaterThan(0);
//        }
//    }
//}
using FluentValidation;
using UrwaveProductApi.DTOs;

namespace UrwaveProductApi.Data
{
    public class ProductValidator : AbstractValidator<CreateProductDto>
    {
        public ProductValidator()
        {
            RuleFor(p => p.Name).NotEmpty().MaximumLength(100);
            RuleFor(p => p.Description).NotEmpty().MaximumLength(500);
            RuleFor(p => p.Price).GreaterThan(0);
        }
    }

    public class UpdateProductValidator : AbstractValidator<UpdateProductDto>
    {
        public UpdateProductValidator()
        {
            RuleFor(p => p.Name).NotEmpty().MaximumLength(100);
            RuleFor(p => p.Description).NotEmpty().MaximumLength(500);
            RuleFor(p => p.Price).GreaterThan(0);
        }
    }
}


