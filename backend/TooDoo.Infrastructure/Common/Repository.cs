
using Microsoft.EntityFrameworkCore;
using TooDoo.Infrastructure.Data;

namespace TooDoo.Infrastructure.Common
{
    public class Repository : IRepository
    {
        private readonly TooDooDbContext _context;

        public Repository(TooDooDbContext context)
        {
            _context = context;
        }

        private DbSet<T> DbSet<T>() where T : class
        {
            return _context.Set<T>();
        }

        /// <summary>
        /// Get all entities of type T
        /// Does not have a check for null entity
        /// If entity is null, returns null
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public IQueryable<T> GetAllAsync<T>() where T : class
        {
            return DbSet<T>();
        }

        /// <summary>
        /// Get all entities of type T
        /// Does not track changes
        /// No updates are going to be applied
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>

        public IQueryable<T> GetAllAsNoTrackingAsync<T>() where T : class
        {
            return DbSet<T>().AsNoTracking();
        }


        /// <summary>
        /// Add entity to the database
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task AddAsync<T>(T entity) where T : class
        {
            await DbSet<T>().AddAsync(entity);
        }

        /// <summary>
        /// Add a range of entities to the database
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entities"></param>
        /// <returns></returns>
        public async Task AddRangeAsync<T>(IEnumerable<T> entities) where T : class
        {
            await DbSet<T>().AddRangeAsync(entities);
        }

        /// <summary>
        /// Delete entity by id
        /// If entity is null, does nothing
        /// No exception is thrown
        /// Parameter is object, so it can be any type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteAsync<T>(object id) where T : class
        {
            T? entity = await GetByIdAsync<T>(id);

            if (entity == null)
            {
                return;
            }

            DbSet<T>().Remove(entity);
        }

        /// <summary>
        /// Get entity by id
        /// Already has a check for null entity
        /// If entity is null, throws an exception
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<T> GetByIdAsync<T>(object id) where T : class
        {
            T? entity = await DbSet<T>().FindAsync(id);

            if(entity == null)
            {
                throw new Exception($"Entity of type {typeof(T).Name} with id {id} not found");
            }

            return entity;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }


    }
}