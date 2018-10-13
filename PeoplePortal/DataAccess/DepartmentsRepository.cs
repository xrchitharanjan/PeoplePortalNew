using PeoplePortal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeoplePortal.DataAccess
{
    public class DepartmentsRepository
    {
        readonly PeoplePortalDBContext db;

        public DepartmentsRepository()
        {
            db = new PeoplePortalDBContext();
        }
        //To Get the list of Departments
        public List<Departments> GetDepartments()
        {
            var lstDepartments = new List<Departments>();
            lstDepartments = (from depts in db.Departments select depts).ToList();
            return lstDepartments;
        }
    }
}
