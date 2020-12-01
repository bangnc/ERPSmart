using ERP_SMART.Business.Utils.Base;
using ERP_SMART.Business.Utils.EnDeCrypt;
using ERP_SMART.Data;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public bool Register(SystemUserDTO systemUserDTO)
        {
            try
            {
                // Kiểm tra hợp lệ dữ liệu
                if (!ValidModelUser(systemUserDTO))
                {
                    return false;
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
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
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
    }
}
