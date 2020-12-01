using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ERP_SMART.Business.Utils.Base
{
    public class CatchError
    {
        public HttpStatusCode status { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public string message { get; set; }
        public CatchError()
        {
            status = HttpStatusCode.InternalServerError;
        }
        public CatchError(Exception exc)
        {
            this.status = HttpStatusCode.InternalServerError;
            this.message = exc.Message;
            if (exc.Data.Contains("status"))
            {
                this.status = (HttpStatusCode)exc.Data["status"];
            }
            if (exc.Data.Contains("code"))
            {
                this.code = Convert.ToString(exc.Data["code"]);
            }
            if (exc.Data.Contains("name"))
            {
                this.name = Convert.ToString(exc.Data["name"]);
            }
            if (exc.Data.Contains("message"))
            {
                this.message = Convert.ToString(exc.Data["message"]);
            }
        }
        public Exception Exception()
        {
            var ex = new Exception(string.Format("{0}", this.message));
            ex.Data.Add("status", this.status);
            ex.Data.Add("code", this.code);
            ex.Data.Add("name", this.name);
            ex.Data.Add("message", this.message);
            return ex;
        }
    }
    public static class ErrorHanler
    {
        public static string _message { get; set; }
        public static Exception invalid_foreign_key
        {
            get
            {
                return new CatchError
                {
                    code = "400",
                    message = _message != null ? _message : "Lỗi liên kết khóa ngoại, không thể cập nhật lại được database",
                    name = "invalid_foreign_key",
                    status = (HttpStatusCode)HttpStatusCode.BadRequest
                }.Exception();
            }
        }
        public static Exception data_exits
        {
            get
            {
                return new CatchError
                {
                    code = "400",
                    message = _message != null ? _message : "Data đã tồn tại. Vui lòng kiêm tra lại thông tin",
                    name = "data_exits",
                    status = HttpStatusCode.BadRequest
                }.Exception();
            }
        }
        public static Exception data_not_exits
        {
            get
            {
                return new CatchError
                {
                    code = "404",
                    message = _message != null ? _message : "Data không tồn tại. Vui lòng kiêm tra lại thông tin",
                    name = "data_not_exits",
                    status = HttpStatusCode.BadRequest
                }.Exception();
            }
        }
        public static Exception ref_error
        {
            get
            {
                return new CatchError
                {
                    code = "404",
                    message = _message != null ? _message : "Lỗi liên kết dữ liệu. Vui lòng kiểm tra lại thông tin",
                    name = "ref_error",
                    status = HttpStatusCode.BadRequest
                }.Exception();
            }
        }
        public static Exception defaultEx
        {
            get
            {
                return new CatchError
                {
                    code = "500",
                    message = _message != null ? _message : "Internal Server Error",
                    name = "InternalServerError",
                    status = HttpStatusCode.InternalServerError
                }.Exception();
            }
        }
    }
}
