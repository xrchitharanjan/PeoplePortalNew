using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeoplePortal.ViewModel
{
    public class PeopleDto
    {
        public int Id { get; set; }
        public int OrganisationId { get; set; }
        public string FirstName { get; set; }
        public string SurName { get; set; }
        public string Gender { get; set; }
        public string MiddleName { get; set; }
        public string  ImageFile { get; set; }
        public bool IsProfilePic { get; set; }
        public int UserId { get; set; }
    }
}
