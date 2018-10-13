using PeoplePortal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeoplePortal.DataAccess
{
    public class PeoplePortalDataAccessLayer
    {
        PeoplePortalDBContext db = new PeoplePortalDBContext();

        public IEnumerable<People> GetAllPeople()
        {
            try
            {
                return db.People.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new People record 
        public int AddPeople(People People)
        {
            try
            {
                db.People.Add(People);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar People
        public int UpdatePeople(People People)
        {
            try
            {
                db.Entry(People).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular People
        public People GetPeopleData(int id)
        {
            try
            {
                People People = db.People.Find(id);
                return People;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record on a particular People
        public int DeletePeople(int id)
        {
            try
            {
                People emp = db.People.Find(id);
                db.People.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

       
    }
}