using System;
using System.Collections.Generic;

namespace PeoplePortal.Models
{
    public partial class People
    {
        public int Id { get; set; }
        public int OrganisationId { get; set; }
        public string FirstName { get; set; }
        public string SurName { get; set; }
        public string Gender { get; set; }
        public string MiddleName { get; set; }
        public int UserId { get; set; }        
    }
}
