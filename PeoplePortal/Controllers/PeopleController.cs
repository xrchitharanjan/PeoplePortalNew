using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeoplePortal.DataAccess;
using PeoplePortal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PeoplePortal.Controllers
{
    [Produces("application/json")]
    [Route("api/People")]
    public class PeopleController : Controller
    {
        PeoplePortalDataAccessLayer ppl = new PeoplePortalDataAccessLayer();


        [HttpGet]
        [Route("Index")]
        public IEnumerable<People> Index()
        {
            return ppl.GetAllPeople();
        }
        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] People People)
        {
            return ppl.AddPeople(People);
        }

        [HttpGet]
        [Route("Details/{id}")]
        public People Details(int id)
        {
            return ppl.GetPeopleData(id);
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