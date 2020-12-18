using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP_SMART.Business.Utils.Base
{
    public class BaseDTO
    {
        public System.DateTime CreateDate { get; set; }
        public System.DateTime UpdateDate { get; set; }
        public System.Guid CreateUserId { get; set; }
        public System.Guid UpdateUserId { get; set; }
        public bool IsActive { get; set; }
    }
}
