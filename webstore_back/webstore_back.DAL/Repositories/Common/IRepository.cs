using culinary_tour.Core.Entities;

namespace webstore_back.DAL.Repositories.Common
{
    public interface IRepository<TEntity, TKey>
        where TEntity : class, IEntity<TKey>
    {
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity?> GetByIdAsync(TKey id);
        Task<TEntity?> CreateAsync(TEntity entity);
        Task<TEntity?> UpdateAsync(TEntity entity);
        Task<TEntity?> DeleteAsync(TKey id);
        Task SaveAsync();
    }
}
