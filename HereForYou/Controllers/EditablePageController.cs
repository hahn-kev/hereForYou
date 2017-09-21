using HereForYou.DataLayer;
using HereForYou.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
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
        public EditablePage Save(string name, [FromBody] string content)
        {
            return _editablePageRepository.SavePage(name, content, User.Identity.Name);
        }
    }
}