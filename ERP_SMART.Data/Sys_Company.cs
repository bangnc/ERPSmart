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
    
    public partial class Sys_Company
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sys_Company()
        {
            this.Sys_Role = new HashSet<Sys_Role>();
        }
    
        public System.Guid CompanyId { get; set; }
        public System.Guid CompanyParentId { get; set; }
        public string CompanyCode { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public string TableofContents { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        public System.DateTime CreateDate { get; set; }
        public System.DateTime UpdateDate { get; set; }
        public System.Guid CreateUser { get; set; }
        public System.Guid UpdateUser { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sys_Role> Sys_Role { get; set; }
    }
}
