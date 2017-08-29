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

        public void SavePage(string name, string content, string currentUser)
        {
            var existing = _connection.EditablePages.Any(page => page.Name == name);
            if (existing)
            {
                _connection.EditablePages.Where(page => page.Name == name)
                    .Set(page => page.Content, content)
                    .Set(page => page.LastUpdated, DateTime.Now)
                    .Set(page => page.UpdatedBy, currentUser)
                    .Update();
            }
            else
            {
                _connection.Insert(new EditablePage
                {
                    Name = name,
                    Content = content,
                    LastUpdated = DateTime.Now,
                    UpdatedBy = currentUser
                });
            }
        }
    }
}