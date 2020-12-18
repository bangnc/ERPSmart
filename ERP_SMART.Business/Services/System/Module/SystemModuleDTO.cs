using ERP_SMART.Business.Utils.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace ERP_SMART.Business.Services.System.Module
{
    public class SystemModuleDTO : BaseDTO
    {
        public Guid ModuleId { get; set; }
        public string ModuleCode { get; set; }
        public string ModuleName { get; set; }
        public int Collocation { get; set; }
        public string Description { get; set; }

    }
}
