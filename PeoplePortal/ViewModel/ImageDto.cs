using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeoplePortal.ViewModel
{
    public class ImageDto
    {
        public int Id { get; set; }
        public int PeopleId { get; set; }
        public string ImageFile { get; set; }
        public string ImageDescription { get; set; }
        public string FileName { get; set; }
        public bool IsProfilePic { get; set; }
    }
}
