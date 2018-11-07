using PeoplePortal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeoplePortal.ViewModel;
using System.Text;

namespace PeoplePortal.DataAccess
{
    public class PeoplePortalDataAccessLayer
    {
        PeoplePortalDBContext db = new PeoplePortalDBContext();


        public IEnumerable<PeopleDto> GetAllPeople()
        {
            try
            {
                return db.People.Select(x =>
                new PeopleDto
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    Gender = x.Gender,
                    ImageFile = null,
                    IsProfilePic = true,
                    MiddleName = x.MiddleName,
                    OrganisationId = x.OrganisationId,
                    SurName = x.SurName,
                    UserId = x.UserId

                }).ToList();
            }
            catch
            {
                throw;
            }

        }
        public IEnumerable<PeopleDto> GetAllPeopleDetails()
        {
            try
            {
                var result = from p in db.People
                             join img in db.Images on p.Id equals img.PeopleId
                             where img.IsProfilePic
                             select new
                             {
                                 p.Id,
                                 p.FirstName,
                                 p.Gender,
                                 ProfileImg = GetBase64Image(img.ImageFile),
                                 p.MiddleName,
                                 p.OrganisationId,
                                 p.SurName,
                                 p.UserId
                             };

                return result.Select(x => new PeopleDto
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    Gender = x.Gender,
                    ImageFile = x.ProfileImg,
                    IsProfilePic = true,
                    MiddleName = x.MiddleName,
                    OrganisationId = x.OrganisationId,
                    SurName = x.SurName,
                    UserId = x.UserId

                }).OrderBy(x => x.FirstName).ToList();

            }
            catch
            {
                throw;
            }
        }

        private string GetBase64Image(byte[] image)
        {
            StringBuilder base64 = new StringBuilder("data:image/jpeg;base64,");
            base64.Append(Convert.ToBase64String(image));
            return (base64.ToString());
            //return Convert.ToBase64String(image);
        }

        //To Add new People record 
        public int AddPeople(PeopleDto PeopleDto)
        {
            try
            {
                People People = new People
                {
                    FirstName = PeopleDto.FirstName,
                    MiddleName = PeopleDto.MiddleName,
                    SurName = PeopleDto.SurName,
                    OrganisationId = PeopleDto.OrganisationId,
                    Gender = PeopleDto.Gender,
                    UserId = PeopleDto.UserId,
                };
                //Images img = new Images
                //{
                //   ImageDescription = "test",
                //   ImageFile = (byte)PeopleDto.ImageFile,
                //   IsProfilePic = PeopleDto.IsProfilePic,                  
                //};
                //People.Images.Add(img);


                db.People.Add(People);
                db.SaveChanges();
                return People.Id;
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