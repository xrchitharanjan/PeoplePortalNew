using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PeoplePortal.Models
{
    public class PeopleProfile
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int PeopleId { get; set; }
        public string Designation { get; set; }
        public string ProfileDescription { get; set; }
        public string Hobbies { get; set; }
    }
}
