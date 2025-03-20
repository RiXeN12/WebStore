using AutoMapper;
using webstore_back.BLL.Services.RoleService;
using webstore_back.BLL.Services;
using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.Repositories.RoleRepository;
using webstore_back.DAL.ViewModels;

namespace webstore_back.BLL.Services.RoleService
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;

        public RoleService(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var roles = await _roleRepository.GetAllAsync();

            var models = _mapper.Map<List<RoleVM>>(roles);

            return ServiceResponse.OkResponse("Ролі отримано", models);
        }

        private async Task<ServiceResponse> GetAsync(Func<string, Task<Role?>> func, string value)
        {
            var role = await func(value);

            if (role == null)
            {
                return ServiceResponse.BadRequestResponse("Не вдалося отримати роль");
            }

            var model = _mapper.Map<RoleVM>(role);

            return ServiceResponse.OkResponse("Роль отримано", model);
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            return await GetAsync(_roleRepository.GetByIdAsync, id);
        }

        public async Task<ServiceResponse> GetByNameAsync(string name)
        {
            return await GetAsync(_roleRepository.GetByNameAsync, name);
        }

        public async Task<ServiceResponse> DeleteAsync(string id)
        {
            var role = await _roleRepository.GetByIdAsync(id);

            if(role == null)
            {
                return ServiceResponse.BadRequestResponse($"Роль з id {id} не знайдено");
            }

            var result = await _roleRepository.DeleteAsync(role);

            return ServiceResponse.ByIdentityResult(result, "Роль успішно видалена");
        }

        public async Task<ServiceResponse> CreateAsync(RoleVM model)
        {
            if(!await _roleRepository.IsUniqueNameAsync(model.Name))
            {
                return ServiceResponse.BadRequestResponse($"Роль з іменем {model.Name} вже існує");
            }

            var role = new Role
            {
                Id = Guid.NewGuid().ToString(),
                Name = model.Name,
                NormalizedName = model.Name.ToUpper()
            };

            var result = await _roleRepository.CreateAsync(role);

            return ServiceResponse.ByIdentityResult(result, "Роль успішно створена");
        }

        public async Task<ServiceResponse> UpdateAsync(RoleVM model)
        {
            if (!await _roleRepository.IsUniqueNameAsync(model.Name))
            {
                return ServiceResponse.BadRequestResponse($"Роль з іменем {model.Name} вже існує");
            }

            var role = await _roleRepository.GetByIdAsync(model.Id);

            if(role == null)
            {
                return ServiceResponse.BadRequestResponse($"Роль з id {model.Id} не знайдено");
            }

            role = _mapper.Map(model, role);

            var result = await _roleRepository.UpdateAsync(role);

            return ServiceResponse.ByIdentityResult(result, "Роль успішно оновлена");
        }
    }
}
