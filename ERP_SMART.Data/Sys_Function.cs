//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ERP_SMART.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sys_Function
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sys_Function()
        {
            this.Sys_Role_Module_Function = new HashSet<Sys_Role_Module_Function>();
        }
    
        public System.Guid FunctionId { get; set; }
        public System.Guid ModuleId { get; set; }
        public string FunctionCode { get; set; }
        public string FunctionName { get; set; }
        public string Description { get; set; }
        public int Collacation { get; set; }
        public bool IsActive { get; set; }
        public System.DateTime CreateDate { get; set; }
        public System.DateTime UpdateDate { get; set; }
        public System.Guid CreateUserId { get; set; }
        public System.Guid UpdateUserId { get; set; }
    
        public virtual Sys_Module Sys_Module { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sys_Role_Module_Function> Sys_Role_Module_Function { get; set; }
    }
}
