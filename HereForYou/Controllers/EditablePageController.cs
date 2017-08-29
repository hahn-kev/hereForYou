using HereForYou.DataLayer;
using HereForYou.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class EditablePageController : Controller
    {
        private readonly EditablePageRepository _editablePageRepository;

        public EditablePageController(EditablePageRepository editablePageRepository)
        {
            _editablePageRepository = editablePageRepository;
        }

        [HttpGet("{name}")]
        public EditablePage Get(string name)
        {
            return _editablePageRepository.GetPage(name);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("{name}")]
        public void Save(string name, [FromBody] string content)
        {
            _editablePageRepository.SavePage(name, content, User.Identity.Name);
        }
    }
}