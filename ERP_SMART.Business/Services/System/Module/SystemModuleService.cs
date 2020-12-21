using ERP_SMART.Business.Utils.Base;
using ERP_SMART.Business.Utils.EnDeCrypt;
using ERP_SMART.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.ModelBinding;
using System.Linq.Dynamic;
using AutoMapper;

namespace ERP_SMART.Business.Services.System.Module
{
    public class SystemModuleService : ISystemModuleService
    {
        private ModelStateDictionary _modelState;
        protected IUnitOfWork _unitOfWork;
        protected IMapper _mapper;
        public SystemModuleService()
        {
            _unitOfWork = new UnitOfWork();
        }

        private Sys_Module ConvertDtoToEntity(SystemModuleDTO sys_Module)
        {
            var result = new Sys_Module();
            result.ModuleId = sys_Module.ModuleId;
            result.ModuleCode = sys_Module.ModuleCode;
            result.ModuleName = sys_Module.ModuleName;
            result.Collocation = sys_Module.Collocation;
            result.Description = sys_Module.Description;
            result.CreateDate = sys_Module.CreateDate;
            result.UpdateDate = sys_Module.UpdateDate;
            result.CreateUserId = sys_Module.CreateUserId;
            result.UpdateUserId = sys_Module.UpdateUserId;
            return result;
        }
        private SystemModuleDTO  ConvertEntityToDto(Sys_Module sys_Module)
        {
            var result = new SystemModuleDTO();
            result.ModuleId = sys_Module.ModuleId;
            result.ModuleCode = sys_Module.ModuleCode;
            result.ModuleName = sys_Module.ModuleName;
            result.Collocation = sys_Module.Collocation;
            result.Description = sys_Module.Description;
            result.CreateDate = sys_Module.CreateDate;
            result.UpdateDate = sys_Module.UpdateDate;
            result.CreateUserId = sys_Module.CreateUserId;
            result.UpdateUserId = sys_Module.UpdateUserId;
            return result;
        }

        public SystemModuleDTO Insert(SystemModuleDTO moduleDTO)
        {
            try
            {
                var convertData = ConvertDtoToEntity(moduleDTO);
                convertData.ModuleId = Guid.NewGuid();
                convertData.CreateDate = DateTime.Now;
                convertData.UpdateDate = DateTime.Now;
                // Kiểm tra hợp lệ dữ liệu
                var kq = _unitOfWork.GetRepository<Sys_Module>().Add(convertData);
                _unitOfWork.Save();
                moduleDTO.ModuleId = kq.ModuleId;
                return moduleDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ResponseList<SystemModuleDTO> GetMany(int page, int page_size, string sort, string filter, string search)
        {
            try
            {
                int total = 0;
                var query = this.eGetMany(page, page_size, sort, filter, search, ref total);
                var lst = query.Select(ob => new SystemModuleDTO
                {
                    ModuleId = ob.ModuleId,
                    ModuleCode = ob.ModuleCode,
                    ModuleName = ob.ModuleName,
                    Collocation = ob.Collocation,
                    Description = ob.Description,
                    IsActive = ob.IsActive,
                    CreateDate = ob.CreateDate,
                    UpdateDate = ob.UpdateDate,
                    CreateUserId = ob.CreateUserId,
                    UpdateUserId = ob.UpdateUserId
                }).ToList();
               // var lst = _mapper.Map<List<Sys_Module>, List<SystemModuleDTO>>(lst_entity);
                return new ResponseList<SystemModuleDTO>(new Meta(page, page_size, total), lst);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<Sys_Module> eGetMany(int page, int page_size, string sort, string filter, string search, ref int total)
        {
            try
            {
                #region xử lý đầu vào sort
                Dictionary<string, dynamic> sortObject = new Dictionary<string, dynamic>();
                try
                {
                    if (sort != null)
                    {
                        sortObject = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(sort);
                    }
                }
                catch (Exception)
                {
                    throw new CatchError
                    {
                        status = HttpStatusCode.BadRequest,
                        code = "0001",
                        name = "invalid_argument",
                        message = "tham số sort truyền vào không đúng"
                    }.Exception();
                }
                if (sortObject.Count() == 0)
                {
                    sortObject.Add("ModuleName", 1);
                }
                #endregion
                #region xử lý đầu vào filter
                dynamic filterObj = new object();
                try
                {
                    if (filter != null)
                    {
                        filterObj = JsonConvert.DeserializeObject<dynamic>(filter);
                    }
                    else
                    {
                        filterObj = null;
                    }
                }
                catch (Exception)
                {
                    throw new CatchError
                    {
                        status = HttpStatusCode.BadRequest,
                        code = "0002",
                        name = "invalid_argument",
                        message = "tham số filter truyền vào không đúng"
                    }.Exception();
                }
                #endregion
                var query = _unitOfWork.GetRepository<Sys_Module>().GetAll();
                #region thực hiện apply filter
                query = QueryBuilder(query, filterObj, search);
                #endregion
                #region thực hiện apply sort query
                String OrderBy = "";
                foreach (var key in sortObject.Keys)
                {
                    // check if the value is not null or empty.
                    if (sortObject.ContainsKey(key))
                    {
                        var orderProp = sortObject[key] == 1 ? "ascending" : "descending";
                        OrderBy += key + " " + orderProp + ",";
                    }
                }
                OrderBy = OrderBy.Substring(0, OrderBy.Length - 1);
                query = query.OrderBy(OrderBy);
                #endregion
                #region thực hiện phân trang và trả về kết quả
                total = query.Count();
                if (page > 0 && page_size > 0)
                {
                    var Index = (page - 1) * page_size;
                    query = query.Skip(Index).Take(page_size);
                }
                #endregion
                return query;
            }
            catch (Exception)
            {
                throw;
            }
        }
        protected IQueryable<Sys_Module> QueryBuilder(IQueryable<Sys_Module> query, dynamic filter, string search)
        {
            if (filter != null)
            {
                String ModuleName = filter.ModuleName;
                if (ModuleName != null && ModuleName != "")
                {
                    ModuleName = ModuleName.ToLower();
                    query = query.Where(x => x.ModuleName.ToLower().Contains(ModuleName));
                }
                String Description = filter.Description;
                if (Description != null && Description != "")
                {
                    Description = Description.ToLower();
                    query = query.Where(x => x.Description.ToLower().Contains(Description));
                }
                String ModuleCode = filter.ModuleCode;
                if (ModuleCode != null && ModuleCode != "")
                {
                    ModuleCode = ModuleCode.ToLower();
                    query = query.Where(x => x.ModuleCode.ToLower().Contains(ModuleCode));
                }
            }
            return query;
        }
        public SystemModuleDTO GetById (Guid Id)
        {
            try
            {
                var entity = _unitOfWork.GetRepository<Sys_Module>().GetById(Id);
                if (entity != null)
                {
                    return ConvertEntityToDto(entity);
                }
                else
                {
                    throw new CatchError
                    {
                        status = HttpStatusCode.BadRequest,
                        code = "0001",
                        name = "invalid_request",
                        message = "Không tìm thấy"
                    }.Exception();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public SystemModuleDTO Update(SystemModuleDTO dto, Guid id) 
        {
            try
            {
                var entity_old = _unitOfWork.GetRepository<Sys_Module>().GetById(id);
                // Update lai gia tri
                entity_old.UpdateDate = DateTime.Now;
                entity_old.UpdateUserId = dto.UpdateUserId;
                //
                entity_old.ModuleCode = dto.ModuleCode;
                entity_old.ModuleName = dto.ModuleName;
                entity_old.Collocation = dto.Collocation;
                entity_old.Description = dto.Description;
                entity_old.IsActive = dto.IsActive;
                _unitOfWork.GetRepository<Sys_Module>().Update(entity_old);
                _unitOfWork.Save();
                return dto;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public bool Remove( Guid id)
        {
            try
            {
                var entity_old = _unitOfWork.GetRepository<Sys_Module>().GetById(id);                
                _unitOfWork.GetRepository<Sys_Module>().Delete(entity_old);
                _unitOfWork.Save();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        /// <summary>
        /// Xóa nhiều
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public bool Removes(List<Guid> ids)
        {
            try
            {
                var entity_old = _unitOfWork.GetRepository<Sys_Module>().GetMany(x => ids.Contains(x.ModuleId));
                _unitOfWork.GetRepository<Sys_Module>().Removes(entity_old);
                _unitOfWork.Save();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
