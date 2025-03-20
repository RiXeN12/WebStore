using AutoMapper;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.ManufacturerRepository;
using webstore_back.DAL.ViewModels.ProductManagementVMs.Manufacturer;

namespace webstore_back.BLL.Services.ManufacturerService
{
    public class ManufacturerService : IManufacturerService
    {
        private readonly IManufacturerRepository _manufacturerRepository;
        private readonly IMapper _mapper;

        public ManufacturerService(IManufacturerRepository manufacturerRepository, IMapper mapper)
        {
            _manufacturerRepository = manufacturerRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var manufacturer = await _manufacturerRepository.GetByIdAsync(id);
            if (manufacturer == null)
            {
                return ServiceResponse.BadRequestResponse("Виробника не знайдено", null);
            }
            return ServiceResponse.OkResponse("Виробника знайдено", manufacturer);
        }

        public async Task<ServiceResponse> GetByNameAsync(string name)
        {
            var manufacturer = await _manufacturerRepository.GetByNameAsync(name);
            if (manufacturer == null)
            {
                return ServiceResponse.BadRequestResponse("Виробника не знайдено", null);
            }
            return ServiceResponse.OkResponse("Виробника знайдено", manufacturer);
        }

        public async Task<ServiceResponse> CreateManufacturerAsync(CreateManufacturerVM model)
        {
            Manufacturer manufacturer = _mapper.Map<Manufacturer>(model);
            if (manufacturer == null)
            {
                return ServiceResponse.BadRequestResponse("Не вдалося створити виробника", null);
            }
            var createdManufacturer = await _manufacturerRepository.CreateAsync(manufacturer);
            return ServiceResponse.OkResponse("Виробника створено", createdManufacturer);
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var models = (await _manufacturerRepository.GetAllAsync()).ToList();

            var manufacturers = _mapper.Map<List<ManufacturerVM>>(models);

            return ServiceResponse.OkResponse("Виробники отримані", manufacturers);
        }

        public async Task<ServiceResponse> UpdateManufacturerAsync(ManufacturerVM model)
        {
            Manufacturer manufacturer = _mapper.Map<Manufacturer>(model);
            if (manufacturer == null)
            {
                return ServiceResponse.BadRequestResponse("Не вдалося оновити виробника", null);
            }
            var updatedManufacturer = await _manufacturerRepository.UpdateAsync(manufacturer);
            return ServiceResponse.OkResponse("Виробника оновлено", updatedManufacturer);
        }

        public async Task<ServiceResponse> DeleteManufacturerAsync(string id)
        {
            var deletedManufacturer = await _manufacturerRepository.DeleteAsync(id);
            if (deletedManufacturer == null)
            {
                return ServiceResponse.BadRequestResponse("Не вдалося видалити виробника", null);
            }
            return ServiceResponse.OkResponse("Виробника видалено", deletedManufacturer);
        }
    }
}
