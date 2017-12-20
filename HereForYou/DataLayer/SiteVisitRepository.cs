using System;
using System.Collections.Generic;
using System.Linq;
using HereForYou.Entities;
using LinqToDB;

namespace HereForYou.DataLayer
{
    public class SiteVisitRepository
    {
        private readonly HereForYouConnection _connection;

        public SiteVisitRepository(HereForYouConnection connection)
        {
            _connection = connection;
        }

        public IQueryable<SiteVisit> SiteVisits => _connection.SiteVisits;

        public void Save(SiteVisit visit)
        {
            if (visit.SiteId <= 0) throw new Exception("visit site id missing");
            if (visit.Id <= 0) Add(visit);
            else
            {
                _connection.Update(visit);
            }
        }

        public int GetVisitSiteId(int visitId)
        {
            return _connection.SiteVisits.Where(visit => visit.Id == visitId).Select(visit => visit.SiteId).Single();
        }

        public SiteVisit Add(SiteVisit visit)
        {
            visit.Id = _connection.InsertId(visit);
            return visit;
        }

        public void Delete(int id)
        {
            int deletedvisits = _connection.SiteVisits.Delete(visit => visit.Id == id);
            if (deletedvisits == 0)
            {
                throw new Exception("No visits were deleted");
            }

            if (deletedvisits > 1)
            {
                throw new Exception(deletedvisits + " visits have been deleted");
            }
        }
    }
}