
using System.Web.Http;
using ERP_SMART.Business.Utils.Unity;
using ERP_SMART.Business.Services.System.User;
using System.Net.Http;
using System;
using System.Net;
using ERP_SMART.Business.Utils.Base;

namespace ERP_SMART.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/SystemUser")]
    public class SystemUserController : ApiController
    {

        private ISystemUserService  userService;
        public SystemUserController()
        {
            userService = MyUnity.GetService<ISystemUserService>();
        }
        [HttpGet]
        [Route("")]
        public HttpResponseMessage Get(int page = 1, int page_size = 0, string sort = null, string filter = null, string search = null)
        {
            try
            {
                var result = userService.GetMany(page, page_size, sort, filter, search);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result);
                return response;
            }
            catch (Exception ex)
            {
                var err = new CatchError(ex);
                HttpResponseMessage response = Request.CreateResponse(err.status, err);
                return response;
            }
        }
        // POST api/Account/Register; Sử dụng git
        [AllowAnonymous]
        [Route("Register")]
        public HttpResponseMessage Register(SystemUserDTO obj)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var result = userService.Register(obj);
                response = Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                var err = new CatchError(ex);
                response = Request.CreateResponse(err.status, err);
            }
            return response;
        }
        [AllowAnonymous]
        [HttpPut]
        [Route("Update/{id}")]
        public HttpResponseMessage Update(SystemUserDTO obj, Guid id)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var result = userService.Update(obj, id);
                response = Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                var err = new CatchError(ex);
                response = Request.CreateResponse(err.status, err);
            }
            return response;
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage GetById(Guid id)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var result = userService.GetById(id);
                response = Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                var err = new CatchError(ex);
                response = Request.CreateResponse(err.status, err);
            }
            return response;
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Login")]
        public HttpResponseMessage Login(SystemUserLoginDTO obj)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var result = userService.Login(obj.UserName, obj.Password);
                response = Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                var err = new CatchError(ex);
                response = Request.CreateResponse(err.status, err);
            }
            return response;
        }
        #region remove
        /// <summary>
        /// Xóa 1 QTHT - Cấu hình hệ thống
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpDelete]
        [Route("{id}")]
        public HttpResponseMessage Remove(Guid id)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var result = userService.Remove(id);
                response = Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                var err = new CatchError(ex);
                response = Request.CreateResponse(err.status, err);
            }
            return response;
        }
        #endregion

    }
}
