using ERP_SMART.Data.Infrastructure;
using System;

namespace ERP_SMART.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<T> GetRepository<T>() where T : class;
        IRepositoryDynamic GetRepositoryDynamic(string entityName);
        void ReCreateContext();
        void SetAutoDetectChangesEnabled(Boolean input);
        ERP_SMARTEntities GetDataContext();     
        int Save();
    }
}
