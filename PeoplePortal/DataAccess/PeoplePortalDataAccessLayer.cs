using PeoplePortal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeoplePortal.ViewModel;

namespace PeoplePortal.DataAccess
{
    public class PeoplePortalDataAccessLayer
    {
        PeoplePortalDBContext db = new PeoplePortalDBContext();

        public IEnumerable<PeopleDto> GetAllPeople()
        {
            try
            {
                return db.People.Select(x=>
                new PeopleDto {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    Gender = x.Gender,
                    ImageFile = null,
                    IsProfilePic =true,
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

        //To Add new People record 
        public int AddPeople(PeopleDto PeopleDto)
        {
            try
            {
                People People = new People {
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

        public int AddImages(Images image)
        {
            try
            {               
                db.Images.Add(image);
                db.SaveChanges();
                return 1;
            }
            catch(Exception ex)
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