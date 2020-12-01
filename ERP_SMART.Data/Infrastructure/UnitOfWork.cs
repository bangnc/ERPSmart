using ERP_SMART.Data.Infrastructure;
using System;
using System.Linq;

namespace ERP_SMART.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private ERP_SMARTEntities _dataContext;
        private bool disposed;

        public UnitOfWork(ERP_SMARTEntities dataContext)
        {
            _dataContext = dataContext;
        }

        public UnitOfWork()
        {
            _dataContext = new ERP_SMARTEntities();
        }

        public ERP_SMARTEntities DataContext
        {
            get { return _dataContext; }
        }

        public IRepository<T> GetRepository<T>() where T : class
        {
            return new Repository<T>(this._dataContext);
        }
        public IRepositoryDynamic GetRepositoryDynamic(string entityName)
        {
            return new RepositoryDynamic(this._dataContext, entityName);
        }
        public int Save()
        {
            if (_dataContext.GetValidationErrors().Any())
            {
                throw (new Exception(_dataContext.GetValidationErrors().ToList()[0].ValidationErrors.ToList()[0].ErrorMessage));
            }
            return DataContext.SaveChanges();
        }
        public void ReCreateContext()
        {
            Dispose(true);
            _dataContext = new ERP_SMARTEntities();

        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _dataContext.Dispose();
                    disposed = true;
                }
            }
            disposed = false;
        }



        public void SetAutoDetectChangesEnabled(bool input)
        {
            _dataContext.Configuration.AutoDetectChangesEnabled = input;
        }

        public ERP_SMARTEntities GetDataContext()
        {
           return _dataContext;
        }
    }
}
