using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PeoplePortal.Models
{
    public class Images
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int PeopleId { get; set; }       
        public byte[] ImageFile { get; set; }
        public string ImageDescription { get; set; }
        public string FileName { get; set; }
        public bool IsProfilePic { get; set; }
    }
}
