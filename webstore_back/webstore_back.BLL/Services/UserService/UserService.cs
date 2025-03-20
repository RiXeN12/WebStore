using AutoMapper;
using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.ViewModels;
using webstore_back.DAL.Repositories.UserRepository;
using webstore_back.DAL;
using webstore_back.DAL.Models.Identity;
using webstore_back.BLL.Services.ImageService;

namespace webstore_back.BLL.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper, IImageService imageService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<ServiceResponse> AddImageFromUserAsync(UserImageVM model)
        {
            var user = await _userRepository.GetByIdAsync(model.UserId);

            if (user == null)
            {
                return ServiceResponse.BadRequestResponse($"Користувача з id {model.UserId} не знайдено");
            }

            var response = await _imageService.SaveImageFromFileAsync(Settings.UserImagesPath, model.Image);

            if (!response.Success)
            {
                return response;
            }

            user.Image = response.Payload.ToString();
            var result = await _userRepository.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return ServiceResponse.BadRequestResponse(result.Errors.First().Description);
            }

            return ServiceResponse.OkResponse("Зображення успішно додано");
        }

        public async Task<ServiceResponse> CreateAsync(CreateUserVM model)
        {
            if (!await _userRepository.IsUniqueUserNameAsync(model.UserName))
            {
                return ServiceResponse.BadRequestResponse($"{model.UserName} вже викорстовується");
            }

            if (!await _userRepository.IsUniqueEmailAsync(model.Email))
            {
                return ServiceResponse.BadRequestResponse($"{model.Email} вже викорстовується");
            }

            var user = _mapper.Map<User>(model);
            user.Id = Guid.NewGuid().ToString();

            var result = await _userRepository.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return ServiceResponse.BadRequestResponse(result.Errors.First().Description);
            }

            await _userRepository.AddToRoleAsync(user, model.Role);

            return ServiceResponse.OkResponse("Користувач успішно створений", _mapper.Map<UserVM>(user));
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                return ServiceResponse.BadRequestResponse($"Користувача з id {id} не знайдено");
            }

            var result = await _userRepository.DeleteAsync(user);

            return ServiceResponse.ByIdentityResult(result, $"Користувача з id {id} успішно видалено");
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var users = await _userRepository
                .GetAll()
                .ToListAsync();

            var models = _mapper.Map<List<UserVM>>(users);

            return ServiceResponse.OkResponse("Користувачів отримано", models);
        }

        public async Task<ServiceResponse> GetAllAsync(int page, int pageSize)
        {
            var users = _userRepository.GetAll();
            int totalCount = users.Count();

            if (pageSize == 0)
            {
                return ServiceResponse.BadRequestResponse($"Incorrect page size");
            }

            int pageCount = (int)Math.Ceiling(totalCount / (decimal)pageSize);

            pageCount = pageCount == 0 ? 1 : pageCount;

            if (page < 1 || page > pageCount)
            {
                return ServiceResponse.BadRequestResponse($"Page {page} not found");
            }

            var list = await users.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            var models = _mapper.Map<List<UserVM>>(list);

            var payload = new UserListVM
            {
                PageCount = pageCount,
                PageSize = pageSize,
                TotalCount = totalCount,
                Page = page,
                Users = models
            };

            return ServiceResponse.OkResponse("Users list", payload);
        }

        public async Task<ServiceResponse> GetByEmailAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email, true);

            if (user == null)
            {
                return ServiceResponse.BadRequestResponse($"Користувача з поштою {email} не знайдено");
            }

            var model = _mapper.Map<UserVM>(user);

            return ServiceResponse.OkResponse("Користувача знайдено", model);
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var user = await _userRepository.GetByIdAsync(id, true);

            if (user == null)
            {
                return ServiceResponse.BadRequestResponse($"Користувача з id {id} не знайдено");
            }

            var model = _mapper.Map<UserVM>(user);

            return ServiceResponse.OkResponse("Користувача знайдено", model);
        }

        public async Task<ServiceResponse> GetByUserNameAsync(string userName)
        {
            var user = await _userRepository.GetByUsernameAsync(userName, true);

            if (user == null)
            {
                return ServiceResponse.BadRequestResponse($"Користувача з іменем {userName} не знайдено");
            }

            var model = _mapper.Map<UserVM>(user);

            return ServiceResponse.OkResponse("Користувача знайдено", model);
        }

        public async Task<ServiceResponse> GetUsersByRoleAsync(string role)
        {
            var models = await _userRepository
                .GetAll()
                .Where(u => u.UserRoles
                    .Select(ur => ur.Role.NormalizedName)
                    .Contains(role.ToUpper()))
                .ToListAsync();

            var users = _mapper.Map<List<UserVM>>(models);

            return ServiceResponse.OkResponse("Users", users);
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateUserVM model)
        {
            if (string.IsNullOrEmpty(model.Id))
            {
                return ServiceResponse.BadRequestResponse("Не вдалося ідентифікувати користувача");
            }

            var user = await _userRepository.GetByIdAsync(model.Id, true);

            if (user == null)
            {
                return ServiceResponse.BadRequestResponse("Користувача не знайдено");
            }

            if (model.Email != user.Email)
            {
                if (!await _userRepository.IsUniqueEmailAsync(model.Email))
                {
                    return ServiceResponse.BadRequestResponse($"Пошта {model.Email} вже використовується");
                }
            }

            if (model.UserName != user.UserName)
            {
                if (!await _userRepository.IsUniqueUserNameAsync(model.UserName))
                {
                    return ServiceResponse.BadRequestResponse($"Ім'я {model.UserName} вже використовується");
                }
            }

            user = _mapper.Map(model, user);

            var result = await _userRepository.UpdateAsync(user);

            if (!user.UserRoles.Any() || user.UserRoles.First().Role.NormalizedName != model.Role.ToUpper())
            {
                // Видалити попередню роль та записати нову
                if (user.UserRoles.Any())
                {
                    user.UserRoles.Remove(user.UserRoles.First());
                    await _userRepository.UpdateAsync(user);
                }


                await _userRepository.AddToRoleAsync(user, model.Role);
            }

            if (result.Succeeded)
            {
                return ServiceResponse.OkResponse("Користувача оновлено", _mapper.Map<UserVM>(user));
            }

            return ServiceResponse.BadRequestResponse(result.Errors.First().Description);
        }
    }
}