using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeoplePortal.DataAccess;
using PeoplePortal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeoplePortal.ViewModel;

namespace PeoplePortal.Controllers
{
    [Produces("application/json")]
    [Route("api/People")]
    public class PeopleController : Controller
    {
        PeoplePortalDataAccessLayer ppl = new PeoplePortalDataAccessLayer();


        [HttpGet]
        [Route("Index")]
        public IEnumerable<PeopleDto> Index()
        {
            return ppl.GetAllPeople();
        }

        [HttpGet]
        [Route("peopledata")]
        public IEnumerable<PeopleDto> GetAllPeopleDetails()
        {
            return ppl.GetAllPeopleDetails();
        }

        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] PeopleDto People)
        {
            People.OrganisationId = 1;
            return ppl.AddPeople(People);
        }

        [HttpGet]
        [Route("Details/{id}")]
        public People Details(int id)
        {
            return ppl.GetPeopleData(id);
        }
        [HttpGet]
        [Route("PeopleDetails/{peopleId}")]
        public PeopleDto GetPeople(int peopleId)
        {
            var result =  ppl.GetPeople(peopleId);
            return result;
        }

        [HttpPut]
        [Route("Edit")]
        public int Edit([FromBody]People People)
        {
            return ppl.UpdatePeople(People);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public int Delete(int id)
        {
            return ppl.DeletePeople(id);
        }

    }
}