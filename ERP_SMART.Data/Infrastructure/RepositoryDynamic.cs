using ERP_SMART.Data;
using System;
using System.Data.Entity;
using System.Linq;

namespace ERP_SMART.Data.Infrastructure
{
    public class RepositoryDynamic : IRepositoryDynamic
    {
        private ERP_SMARTEntities _dataContext;
        private readonly DbSet _dbSet;
        public RepositoryDynamic(ERP_SMARTEntities dataContext, string entityName)
        {
            _dataContext = dataContext;
            string TableName = "ERP_SMART.Data" + "." + entityName + ", " + "ERP_SMART.Data";
            System.Type type = System.Type.GetType(TableName);
            _dbSet = _dataContext.Set(type);
        }

        public object GetById(Guid id)
        {
            return _dbSet.Find(id);
        }
        public virtual void Update(object entity)
        {
            _dbSet.Attach(entity);
            _dataContext.Entry(entity).State = EntityState.Modified;
        }
        public virtual IQueryable GetAll()
        {
            var q = _dbSet.AsQueryable();
            return q;

        }




    }
}
