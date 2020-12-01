using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;

namespace ERP_SMART.Data
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private ERP_SMARTEntities _dataContext;
        private readonly DbSet<T> _dbset;
        private string _errorMessage = string.Empty;
        public Repository(ERP_SMARTEntities dataContext)
        {
            _dataContext = dataContext;
            _dbset = _dataContext.Set<T>();
        }


        protected ERP_SMARTEntities DataContext
        {
            get { return _dataContext; }
        }

        /// <summary>
        /// Lấy về tổng số
        /// </summary>
        public virtual int Count
        {
            get { return _dbset.Count(); }
        }

        /// <summary>
        /// Lấy về tất cả đối tượng
        /// </summary>
        public virtual IQueryable<T> GetAll()
        {
            return _dbset.AsQueryable();
        }

        /// <summary>
        /// Lấy về tất cả đối tượng
        /// </summary>
        public virtual IQueryable<T> GetAll(Expression<Func<T, string>> orderByProperty, bool isAscendingOrder)
        {
            var resetSet = _dbset.AsQueryable();

            resetSet = isAscendingOrder ? resetSet.OrderBy(orderByProperty) : resetSet.OrderByDescending(orderByProperty);

            //Skip the required rows for the current page and take the next records of pagesize count
            return resetSet;
        }

        /// <summary>
        /// Lấy về đối tượng theo mã đối tượng
        /// </summary>
        /// <param name="id">mã đối tượng</param>        
        /// <remarks>
        /// Mã đối tượng kiểu decimal
        /// </remarks>
        public virtual T GetById(Guid id)
        {
            return _dbset.Find(id);
        }

        /// <summary>
        /// Lấy về đối tượng theo mã đối tượng
        /// </summary>
        /// <param name="id">mã đối tượng</param>        
        /// <remarks>
        /// Mã đối tượng kiểu chuỗi
        /// </remarks>
        public virtual T GetById(string id)
        {
            return _dbset.Find(id);
        }

        /// <summary>
        /// Lấy về đối tượng đầu tiên theo tiêu chí tìm kiếm
        /// </summary>
        /// <param name="where">tiêu chí tìm kiếm</param>    
        public T Get(Expression<Func<T, bool>> predicate)
        {
            return _dbset.Where(predicate).FirstOrDefault<T>();
        }


        /// <summary>
        /// Lấy về các đối tượng theo tiêu chí tìm kiếm
        /// </summary>
        /// <param name="where">tiêu chí tìm kiếm</param>  
        /// <remarks>
        /// where: bieu thuc linq
        /// </remarks>
        public virtual IQueryable<T> GetMany(Expression<Func<T, bool>> predicate)
        {
            return _dbset.Where(predicate);
        }


        /// <summary>
        /// Thêm mới đối tượng
        /// </summary>
        /// <param name="entity">đối tượng được thêm mới</param>        
        /// <remarks>
        /// </remarks>
        public virtual T Add(T entity)
        {
            return _dbset.Add(entity);

        }
        // Insert much object
        public void BulkInsert(IEnumerable<T> entities)
        {
            try
            {
                if (entities == null)
                {
                    throw new ArgumentNullException("entities");
                }
                _dataContext.Configuration.AutoDetectChangesEnabled = false;
                _dataContext.Set<T>().AddRange(entities);
                _dataContext.SaveChanges();
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        _errorMessage += string.Format("Property: {0} Error: {1}", validationError.PropertyName,
                        validationError.ErrorMessage) + Environment.NewLine;
                    }
                }
                throw new Exception(_errorMessage, dbEx);
            }
        }
        /// <summary>
        /// Cập nhật đối tượng
        /// </summary>
        /// <param name="entity">đối tượng được cập nhật</param>        
        /// <remarks>
        /// </remarks>
        public virtual void Update(T entity)
        {
            _dbset.Attach(entity);
            _dataContext.Entry(entity).State = EntityState.Modified;
        }

        /// <summary>
        /// Xóa đối tượng
        /// </summary>
        /// <param name="entity">đối tượng bị xóa</param>        
        /// <remarks>
        /// </remarks>
        public virtual void Delete(T entity)
        {
            _dbset.Remove(entity);
        }



        public virtual void Removes(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> objects = _dbset.Where<T>(predicate);
            _dbset.RemoveRange(objects.AsEnumerable());
        }
        public virtual void Removes(IEnumerable<T> list_delete)
        {
            _dbset.RemoveRange(list_delete);
        }
        public virtual void ReloadRef(T entity)
        {
            var workspace = ((IObjectContextAdapter)_dataContext).ObjectContext.MetadataWorkspace;
            var itemCollection = (ObjectItemCollection)(workspace.GetItemCollection(DataSpace.OSpace));
            var entityType = itemCollection.OfType<EntityType>().FirstOrDefault(e => itemCollection.GetClrType(e) == typeof(T));
            if (entityType != null)
            {
                foreach (var navigationProperty in entityType.NavigationProperties)
                {
                    var navigationType = navigationProperty.TypeUsage.EdmType.BuiltInTypeKind.ToString();
                    if (navigationType == "EntityType")
                    {
                        _dataContext.Entry(entity).Reference(navigationProperty.Name).Load();
                    }
                    if (navigationType == "CollectionType")
                    {
                        _dataContext.Entry(entity).Collection(navigationProperty.Name).Load();
                    }
                }
            }
        }
    }
}
