using System;
using System.Linq;

namespace ERP_SMART.Data.Infrastructure
{
    public interface IRepositoryDynamic
    {
        object GetById(Guid id);
        void Update(object entity);
        IQueryable GetAll();
    }
}
