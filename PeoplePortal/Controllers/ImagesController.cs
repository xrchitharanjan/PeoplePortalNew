using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeoplePortal.DataAccess;
using PeoplePortal.Models;

namespace PeoplePortal.Controllers
{
    [Produces("application/json")]
    [Route("api/images")]
    public class ImagesController : Controller
    {
        PeoplePortalDataAccessLayer ppl = new PeoplePortalDataAccessLayer();
        private readonly IHostingEnvironment _environment;
        public ImagesController(IHostingEnvironment environment)
        {
            _environment = environment ?? throw new ArgumentNullException(nameof(environment));
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("test")]
        public ActionResult test([FromBody] int abc)
        {
            return null;

        }


        [HttpPost, DisableRequestSizeLimit]
        [Route("create")]
        public ActionResult Create()
        {
            try
            {
                var files = Request.Form.Files[0];
                string folderName = "Upload";
                string webRootPath = _environment.WebRootPath;
                string filePath = Path.Combine(webRootPath, folderName);
                string fullPath = Path.Combine(filePath, files.FileName + DateTime.Now.ToString());
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
                            PeopleId = 15
                        };
                        ppl.AddImages(image);

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
                throw;
            }

        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("createfile")]
        public ActionResult CreateFile(IFormFile _file)
        {
            try
            {
                var files = Request.Form.Files[0];
                string folderName = "Upload";
                string webRootPath = _environment.WebRootPath;
                string filePath = Path.Combine(webRootPath, folderName);
                string fullPath = Path.Combine(filePath, files.FileName + DateTime.Now.ToString());
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
                            PeopleId = 15
                        };
                        ppl.AddImages(image);

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