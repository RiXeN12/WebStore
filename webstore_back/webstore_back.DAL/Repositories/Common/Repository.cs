using culinary_tour.Core.Entities;
using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Data;

namespace webstore_back.DAL.Repositories.Common
{
    public class Repository<TEntity, TKey> : IRepository<TEntity, TKey>
       where TEntity : class, IEntity<TKey>
    {
        protected AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync() => _appDbContext.Set<TEntity>();

        public virtual async Task<TEntity?> CreateAsync(TEntity entity)
        {
            await _appDbContext.Set<TEntity>().AddAsync(entity);
            await SaveAsync();
            
            return entity;
        }
        public virtual async Task<TEntity?> UpdateAsync(TEntity entity)
        {
            _appDbContext.Set<TEntity>().Update(entity);
            await SaveAsync();
            
            return entity;
        }
        public virtual async Task<TEntity?> DeleteAsync(TKey id)
        {
            var entity = await _appDbContext.Set<TEntity>().FindAsync(id);
            _appDbContext.Set<TEntity>().Remove(entity);
            await SaveAsync();

            return entity;
        }
        public virtual async Task<TEntity?> GetByIdAsync(TKey id)
        {
            return await _appDbContext.Set<TEntity>().FindAsync(id);
        }

        public async Task SaveAsync() => await _appDbContext.SaveChangesAsync();
    }
}
