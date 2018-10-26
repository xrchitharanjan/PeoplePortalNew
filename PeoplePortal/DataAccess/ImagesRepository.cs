using PeoplePortal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeoplePortal.DataAccess
{
    public class ImagesRepository
    {
        readonly PeoplePortalDBContext db;

        public ImagesRepository()
        {
            db = new PeoplePortalDBContext();
        }

        public int AddImages(Images image)
        {
            try
            {
                db.Images.Add(image);
                db.SaveChanges();
                return 1;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        //To Get the list of Departments
        public List<Images> GetAllImagesByPeople(int PeopleId)
        {
            var lstImages = new List<Images>();
            lstImages = (from imgs in db.Images where imgs.PeopleId.Equals(PeopleId) select imgs).ToList();
            return lstImages;
        }
    }
}
