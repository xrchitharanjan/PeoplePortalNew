using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeoplePortal.DataAccess;
using PeoplePortal.Models;
using PeoplePortal.ViewModel;

namespace PeoplePortal.Controllers
{
    [Produces("application/json")]
    [Route("api/images")]
    public class ImagesController : Controller
    {
        ImagesRepository imgsRepo = new ImagesRepository();
        private readonly IHostingEnvironment _environment;
        public ImagesController(IHostingEnvironment environment)
        {
            _environment = environment ?? throw new ArgumentNullException(nameof(environment));
        }

        [HttpGet]
        [Route("profilepic/{peopleId}")]
        public IActionResult GetImages(int PeopleId)
        {
            var data = imgsRepo.GetAllImagesByPeople(PeopleId);
            var result = data.Select(p => new ImageDto
            {
                PeopleId = p.PeopleId,
                FileName = p.FileName,
                Id = p.Id,
                ImageDescription = p.ImageDescription,
                ImageFile = Convert.ToBase64String(p.ImageFile),
                IsProfilePic = p.IsProfilePic
                
            }).ToList();
            return new ObjectResult(result);
        }

        [HttpGet]
        [Route("profileimage/{peopleId}")]
        public string GetProfileImage(int PeopleId)
        {
            var data = imgsRepo.GetAllImagesByPeople(PeopleId);
            var result = data.Select(p => new ImageDto
            {
                PeopleId = p.PeopleId,
                FileName = p.FileName,
                Id = p.Id,
                ImageDescription = p.ImageDescription,
                ImageFile = Convert.ToBase64String(p.ImageFile),
                IsProfilePic = p.IsProfilePic

            }).FirstOrDefault();
            StringBuilder base64 =  new StringBuilder("data:image/jpeg;base64,");
            base64.Append(result.ImageFile);
            return (base64.ToString());
        }
        [HttpGet]
        [Route("profileimageasblob/{peopleId}")]
        public string GetProfileBlobImage(int PeopleId)
        {
            var data = imgsRepo.GetAllImagesByPeople(PeopleId);
            var result = data.Select(p => new ImageDto
            {
                PeopleId = p.PeopleId,
                FileName = p.FileName,
                Id = p.Id,
                ImageDescription = p.ImageDescription,
                ImageFile = Convert.ToBase64String(p.ImageFile),
                IsProfilePic = p.IsProfilePic

            }).FirstOrDefault();
            return (result.ImageFile);
        }



        [HttpGet]
        [Route("allImages/{peopleId}")]
        public List<ImageDto> GetProfilePic(int PeopleId)
        {
            var data = imgsRepo.GetAllImagesByPeople(PeopleId).Where(p=> p.IsProfilePic);
            var result = data.Select(p => new ImageDto
            {
                PeopleId = p.PeopleId,
                FileName = p.FileName,
                Id = p.Id,
                ImageDescription = p.ImageDescription,
                ImageFile = Convert.ToBase64String(p.ImageFile),
                IsProfilePic = p.IsProfilePic

            }).ToList();
            return result;
        }

        [HttpPost]
        [Route("create/{peopleId}")]
        public ActionResult Create(int PeopleId)
        {
            try
            {
                var files = Request.Form.Files[0];
                string folderName = "Upload";
                string webRootPath = _environment.WebRootPath;
                string filePath = Path.Combine(webRootPath, folderName);
                string fullPath = Path.Combine(filePath, files.FileName);
                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }
                if (files.Length > 0)
                {
                    using (var stream = new FileStream(fullPath, FileMode.CreateNew, FileAccess.ReadWrite))
                    {
                        files.CopyToAsync(stream);

                        byte[] array = new byte[stream.Length];
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.Read(array, 0, array.Length);

                        Images image = new Images()
                        {
                            ImageFile = array,
                            FileName = files.FileName,
                            IsProfilePic = true,
                            PeopleId = PeopleId
                        };
                        imgsRepo.AddImages(image);

                        if (fullPath != null)
                        {
                            try
                            {
                                System.IO.File.Delete(fullPath);
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine(ex.StackTrace);
                            }
                        }

                    }
                }
                return Json("Upload Successful.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                throw;
            }

        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("createfile/{peopleId}")]
        public ActionResult CreateFile(int PeopleId)
        {
            try
            {
                var files = Request.Form.Files[0];
                string folderName = "Upload";
                string webRootPath = _environment.WebRootPath;
                string filePath = Path.Combine(webRootPath, folderName);
                string fullPath = Path.Combine(filePath, files.FileName);
                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }
                if (files.Length > 0)
                {
                    using (var stream = new FileStream(fullPath, FileMode.CreateNew, FileAccess.ReadWrite))
                    {
                        files.CopyToAsync(stream);

                        byte[] array = new byte[stream.Length];
                        stream.Seek(0, SeekOrigin.Begin);
                        stream.Read(array, 0, array.Length);

                        Images image = new Images()
                        {
                            ImageFile = array,
                            FileName = files.FileName,
                            PeopleId = PeopleId,
                            IsProfilePic = false
                        };
                        imgsRepo.AddImages(image);

                        if (fullPath != null)
                        {
                            System.IO.File.Delete(fullPath);
                        }

                    }
                }
                return Json("Upload Successful.");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                throw;
            }

        }
        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
    }
}