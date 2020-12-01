using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;


namespace ERP_SMART.Data
{
    public interface IRepository<T> where T : class
    {
        /// <summary>
        /// Lấy về tổng số
        /// </summary>
        int Count { get; }


        /// <summary>
        /// Lấy về tất cả đối tượng
        /// </summary>
        IQueryable<T> GetAll();

        /// <summary>
        /// Lấy về tất cả đối tượng
        /// </summary>
        IQueryable<T> GetAll(Expression<Func<T, string>> orderByProperty, bool isAscendingOrder);

        /// <summary>
        /// Lấy về đối tượng theo mã đối tượng
        /// </summary>
        /// <param name="id">mã đối tượng</param>        
        /// <remarks>
        /// Mã đối tượng kiểu decimal
        /// </remarks>
        T GetById(Guid Id);

        /// <summary>
        /// Lấy về đối tượng theo mã đối tượng
        /// </summary>
        /// <param name="id">mã đối tượng</param>        
        /// <remarks>
        /// Mã đối tượng kiểu chuỗi
        /// </remarks>
        T GetById(string Id);

        /// <summary>
        /// Lấy về đối tượng đầu tiên theo tiêu chí tìm kiếm
        /// </summary>
        /// <param name="where">tiêu chí tìm kiếm</param>    
        T Get(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Lấy về các đối tượng theo tiêu chí tìm kiếm
        /// </summary>
        /// <param name="where">tiêu chí tìm kiếm</param>
        /// <remarks>
        /// where: Bieu thuc linq
        /// </remarks>
        IQueryable<T> GetMany(Expression<Func<T, bool>> predicate);


        /// <summary>
        /// Thêm mới đối tượng
        /// </summary>
        /// <param name="entity">đối tượng được thêm mới</param>        
        /// <remarks>
        /// </remarks>
        T Add(T entity);

        /// <summary>
        /// Cập nhật đối tượng
        /// </summary>
        /// <param name="entity">đối tượng được cập nhật</param>        
        /// <remarks>
        /// </remarks>
        void Update(T entity);

        /// <summary>
        /// Xóa đối tượng
        /// </summary>
        /// <param name="entity">đối tượng bị xóa</param>        
        /// <remarks>
        /// </remarks>
        void Delete(T entity);

        /// <summary>
        /// Xóa đối tượng dựa theo các điều kiện
        /// </summary>
        /// <param name="where">điều kiện</param>        
        /// <remarks>
        /// </remarks>
        void Removes(Expression<Func<T, bool>> predicate);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="list_delete"></param>
        void Removes(IEnumerable<T> list_delete);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        void ReloadRef(T entity);

    }
}
