
using System.Web.Http;
using ERP_SMART.Business.Utils.Unity;
using ERP_SMART.Business.Services.System.User;
using System.Net.Http;
using System;
using System.Net;
using ERP_SMART.Business.Utils.Base;
using ERP_SMART.Business.Services.System.Module;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;

namespace ERP_SMART.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/SystemModule")]
    public class SystemModuleController : BaseController
    {

        private ISystemModuleService  moduleService;
        public SystemModuleController()
        {
            moduleService = MyUnity.GetService<ISystemModuleService>();
        }

        // POST api/Account/Register; Sử dụng git abc
        [HttpPost]
        [Route("")]
        public HttpResponseMessage Insert(SystemModuleDTO obj)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {               
                var userId = (Guid)base.GetUserId();
                obj.CreateUserId = obj.UpdateUserId = userId;
                var result = moduleService.Insert(obj);               
                response = Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                var err = new CatchError(ex);
                response = Request.CreateResponse(err.status, err);
            }
            return response;
        }
        [HttpGet]
        [Route("")]
        public HttpResponseMessage Get(int page = 1, int page_size = 0, string sort = null, string filter = null, string search = null)
        {
            try
            {
                var result = moduleService.GetMany(page, page_size, sort, filter, search);
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
        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage GetById(Guid id)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var result = moduleService.GetById(id);
                response = Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                var err = new CatchError(ex);
                response = Request.CreateResponse(err.status, err);
            }
            return response;
        }

        [HttpPut]
        [Route("{id}")]
        public HttpResponseMessage Update(SystemModuleDTO obj, Guid id)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var result = moduleService.Update(obj, id);
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
        [HttpDelete]
        [Route("{id}")]
        public HttpResponseMessage Remove(Guid id)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var result = moduleService.Remove(id);
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
        #region removes       
        [HttpPost]
        [Route("deletes")]
        public HttpResponseMessage Removes(List<Guid> ids)
        {

            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var result = false;
                result = moduleService.Removes(ids);
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
