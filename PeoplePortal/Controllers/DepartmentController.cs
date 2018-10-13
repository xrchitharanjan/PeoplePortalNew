using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeoplePortal.DataAccess;
using PeoplePortal.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PeoplePortal.Controllers
{

    [Route("api/departments")]
    public class DepartmentController : Controller
    {
        DepartmentsRepository departments = new DepartmentsRepository();

        [HttpGet]
        [Route("Index")]
        public IEnumerable<Departments> Index()
        {
            return departments.GetDepartments();
        }

        
        [HttpGet]
        [Route("api/People/GetCityList")]
        public IEnumerable<Departments> Details()
        {
            return departments.GetDepartments();
        }
    }

}