using System;
using System.Linq;
using HereForYou.Entities;
using LinqToDB;

namespace HereForYou.DataLayer
{
    public class EditablePageRepository
    {
        private readonly HereForYouConnection _connection;

        public EditablePageRepository(HereForYouConnection connection)
        {
            _connection = connection;
        }

        public EditablePage GetPage(string name)
        {
            return _connection.EditablePages.SingleOrDefault(page => page.Name == name);
        }

        public EditablePage SavePage(string name, string content, string currentUser)
        {
            var existing = _connection.EditablePages.FirstOrDefault(page => page.Name == name);
            if (existing != null)
            {
                existing.Content = content;
                existing.UpdatedBy = currentUser;
                existing.LastUpdated = DateTime.Now;
                _connection.Update(existing);
                return existing;
            }
            var editablePage = new EditablePage
            {
                Name = name,
                Content = content,
                LastUpdated = DateTime.Now,
                UpdatedBy = currentUser
            };
            _connection.Insert(editablePage);
            return editablePage;
        }
    }
}