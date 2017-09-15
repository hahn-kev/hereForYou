using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using HereForYou.DataLayer;
using HereForYou.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    [Route("api/[controller]")]
    public class ImageController : Controller
    {
        private readonly ImageRepository _imageRepository;

        public ImageController(ImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        [HttpPost("{category}/{name}")]
        public async Task<IActionResult> Upload(string category, string name, string type)
        {
            var imageInfo = new ImageInfo
            {
                Category = category,
                Name = name,
                Type = type
            };
            imageInfo = await _imageRepository.InsertImage(imageInfo, Request.Body);

            return Json(imageInfo);
        }

        [HttpGet("{id}")]
        public async Task Get(int id)
        {
            await _imageRepository.GetImage(id, (stream, info) =>
            {
                Response.StatusCode = 200;
                Response.ContentLength = stream.Length;
                Response.ContentType = info.Type;
                return stream.CopyToAsync(Response.Body);
            });
        }

        [HttpGet]
        public IEnumerable<ImageInfo> Images()
        {
            return _imageRepository.Images();
        }

        [HttpDelete("{id}")]
        public void Delete(int id, uint? oid)
        {
            _imageRepository.Delete(id, oid);
        }
    }
}