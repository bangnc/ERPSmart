using ERP_SMART.Business.Utils.Base;
using ERP_SMART.Business.Utils.EnDeCrypt;
using ERP_SMART.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.ModelBinding;

namespace ERP_SMART.Business.Services.System.User
{
    public class SystemUserService : ISystemUserService
    {
        private ModelStateDictionary _modelState;
        protected IUnitOfWork _unitOfWork;
        public SystemUserService()
        {
            _unitOfWork = new UnitOfWork();
        }
        public SystemUserDTO Login(string userName, string passWord)
        {
            try
            {
                // kiểm tra null;
                if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(userName))
                {
                    throw new CatchError
                    {
                        status = HttpStatusCode.BadRequest,
                        code = "0001",
                        name = "invalid_mat_khau",
                        message = "Tài khoản hoặc mật khẩu đang để trống"
                    }.Exception();
                }
                // tạo password;
                var convertPass = Cipher.Encrypt(userName, passWord);
                var user = _unitOfWork.GetRepository<Sys_User>().GetMany(x => x.UserName == userName && x.Password == convertPass).FirstOrDefault();
                if (user == null)
                {
                    throw new CatchError
                    {
                        status = HttpStatusCode.BadRequest,
                        code = "0001",
                        name = "invalid_mat_khau",
                        message = "Tài khoản và mật khẩu không chính xác"
                    }.Exception();
                }
                else
                {
                    return ConvertEntityToModelSystemUser(user);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        public ResponseList<SystemUserDTO> GetMany(int page, int page_size, string sort, string filter, string search)
        {
            try
            {
                int total = 0;
                var query = this.eGetMany(page, page_size, sort, filter, search, ref total);
                var lst = query.Select(ob => new SystemUserDTO
                {
                    UserId = ob.UserId,
                    FullName = ob.FullName,
                    UserName = ob.UserName,
                    Password = ob.Password,
                    IsAdmin = ob.IsAdmin,
                    Email = ob.Email,
                    Mobile = ob.Mobile,
                    Avatar = ob.Avatar,
                    ClientId = ob.ClientId,
                    IsActive = ob.IsActive,
                    CreateDate = ob.CreateDate,
                    UpdateDate = ob.UpdateDate,
                    CreateUserId = ob.CreateUserId,
                    UpdateUserId = ob.UpdateUserId,
                }
            ).ToList();
                // var lst = _mapper.Map<List<Sys_Module>, List<SystemModuleDTO>>(lst_entity);
                return new ResponseList<SystemUserDTO>(new Meta(page, page_size, total), lst);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IQueryable<Sys_User> eGetMany(int page, int page_size, string sort, string filter, string search, ref int total)
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
                //if (sortObject.Count() == 0)
                //{
                //    sortObject.Add("ModuleName", 1);
                //}
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
                var query = _unitOfWork.GetRepository<Sys_User>().GetAll();
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
        protected IQueryable<Sys_User> QueryBuilder(IQueryable<Sys_User> query, dynamic filter, string search)
        {
            if (filter != null)
            {
                String userName = filter.Description;
                if (userName != null && userName != "")
                {
                    userName = userName.ToLower();
                    query = query.Where(x => x.UserName.ToLower().Contains(userName));
                }
                //String Description = filter.Description;
                //if (Description != null && Description != "")
                //{
                //    Description = Description.ToLower();
                //    query = query.Where(x => x.Description.ToLower().Contains(Description));
                //}
                //String ModuleCode = filter.ModuleCode;
                //if (ModuleCode != null && ModuleCode != "")
                //{
                //    ModuleCode = ModuleCode.ToLower();
                //    query = query.Where(x => x.ModuleCode.ToLower().Contains(ModuleCode));
                //}
            }
            return query;
        }
        public SystemUserDTO Register(SystemUserDTO systemUserDTO)
        {
            try
            {
                // Kiểm tra hợp lệ dữ liệu
                if (!ValidModelUser(systemUserDTO))
                {
                    return null;
                }
                else
                {
                    // Tạo pass
                    var pass = Cipher.Encrypt(systemUserDTO.UserName, systemUserDTO.Password);
                    systemUserDTO.UserId = Guid.NewGuid();
                    systemUserDTO.CreateDate = DateTime.Now;
                    systemUserDTO.UpdateDate = DateTime.Now;
                    systemUserDTO.UpdateDate = DateTime.Now;
                    systemUserDTO.Avatar = "Avatar";
                    systemUserDTO.Password = pass;
                    var kq = ConvertModelToEntitySystemUser(systemUserDTO);
                    _unitOfWork.GetRepository<Sys_User>().Add(kq);
                    _unitOfWork.Save();
                    systemUserDTO.UserId = kq.UserId;
                    // return systemUserDTO;
                }
                return systemUserDTO;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
        /// <summary>
        /// bangnc
        /// Kiểm tra model SystemUser
        /// </summary>
        /// <param name="systemUserDTO"></param>
        /// <returns></returns>
        private bool ValidModelUser(SystemUserDTO systemUserDTO)
        {
            // Kiểm tra UserName
            if (string.IsNullOrEmpty(systemUserDTO.UserName))
            {
                return false;
            }
            if (string.IsNullOrEmpty(systemUserDTO.Password))
            {
                return false;
            }
            if (string.IsNullOrEmpty(systemUserDTO.Email))
            {
                return false;
            }
            return true;
        }
        private SystemUserDTO ConvertEntityToModelSystemUser(Sys_User sys_User)
        {
            var result = new SystemUserDTO();
            result.UserId = sys_User.UserId;
            result.UserName = sys_User.UserName;
            result.FullName = sys_User.FullName;
            result.Password = sys_User.Password;
            result.IsAdmin = sys_User.IsAdmin;
            result.Email = sys_User.Email;
            result.Mobile = sys_User.Mobile;
            result.Avatar = sys_User.Avatar;
            result.ClientId = sys_User.ClientId;
            result.IsActive = sys_User.IsActive;
            result.CreateDate = sys_User.CreateDate;
            result.UpdateDate = sys_User.UpdateDate;
            result.CreateUserId = sys_User.CreateUserId;
            result.UpdateUserId = sys_User.UpdateUserId;
            return result;
        }
        private Sys_User ConvertModelToEntitySystemUser(SystemUserDTO sys_User)
        {
            var result = new Sys_User();
            result.UserId = sys_User.UserId;
            result.UserName = sys_User.UserName;
            result.FullName = sys_User.FullName;
            result.Password = sys_User.Password;
            result.IsAdmin = sys_User.IsAdmin;
            result.Email = sys_User.Email;
            result.Mobile = sys_User.Mobile;
            result.Avatar = sys_User.Avatar;
            result.ClientId = sys_User.ClientId;
            result.IsActive = sys_User.IsActive;
            result.CreateDate = sys_User.CreateDate;
            result.UpdateDate = sys_User.UpdateDate;
            result.CreateUserId = sys_User.CreateUserId;
            result.UpdateUserId = sys_User.UpdateUserId;
            return result;
        }
        private SystemUserDTO ConvertEntityToDto(Sys_User sys_user)
        {
            var result = new SystemUserDTO();
            result.UserId = sys_user.UserId;
            result.FullName = sys_user.FullName;
            result.UserName = sys_user.UserName;
            result.Password = sys_user.Password;
            result.IsAdmin = sys_user.IsAdmin;
            result.Email = sys_user.Email;
            result.Mobile = sys_user.Mobile;
            result.Avatar = sys_user.Avatar;
            result.ClientId = sys_user.ClientId;
            result.IsActive = sys_user.IsActive;
            result.CreateDate = sys_user.CreateDate;
            result.UpdateDate = sys_user.UpdateDate;
            result.CreateUserId = sys_user.CreateUserId;
            result.UpdateUserId = sys_user.UpdateUserId;
            return result;
        }
        public SystemUserDTO GetById(Guid Id)
        {
            try
            {
                var entity = _unitOfWork.GetRepository<Sys_User>().GetById(Id);
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
        public SystemUserDTO Update(SystemUserDTO dto, Guid id)
        {
            try
            {
                var entity_old = _unitOfWork.GetRepository<Sys_User>().GetById(id);
                // Update lai gia tri
                //entity_old.UpdateDate = DateTime.Now;
                //entity_old.UpdateUserId = dto.UpdateUserId;
                ////
                //entity_old.ModuleCode = dto.ModuleCode;
                //entity_old.ModuleName = dto.ModuleName;
                //entity_old.Collocation = dto.Collocation;
                //entity_old.Description = dto.Description;
                //entity_old.IsActive = dto.IsActive;



                entity_old.UserId = dto.UserId;
                entity_old.FullName = dto.FullName;
                entity_old.UserName = dto.UserName;
                entity_old.Password = dto.Password;
                entity_old.IsAdmin = dto.IsAdmin;
                entity_old.Email = dto.Email;
                entity_old.Mobile = dto.Mobile;
                entity_old.Avatar = dto.Avatar;
                entity_old.ClientId = dto.ClientId;
                entity_old.IsActive = dto.IsActive;
                entity_old.CreateDate = dto.CreateDate;
                entity_old.UpdateDate = DateTime.Now;
                entity_old.CreateUserId = dto.CreateUserId;
                entity_old.UpdateUserId = dto.UpdateUserId;

                _unitOfWork.GetRepository<Sys_User>().Update(entity_old);
                _unitOfWork.Save();
                return dto;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public bool Remove(Guid id)
        {
            try
            {
                var entity_old = _unitOfWork.GetRepository<Sys_User>().GetById(id);
                _unitOfWork.GetRepository<Sys_User>().Delete(entity_old);
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
