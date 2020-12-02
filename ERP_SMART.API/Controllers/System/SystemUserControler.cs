
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

    }
}
