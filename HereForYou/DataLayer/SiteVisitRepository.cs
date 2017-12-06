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

        public void Save(SiteVisit visit)
        {
            if (visit.Id <= 0) add(visit);
            else
            {
                _connection.Update(visit);

            }
        }
        public SiteVisit add(SiteVisit visit)
        {
            visit.Id = _connection.InsertId(visit);
            return visit;

        }
        public void Delete(int Id)
        {
            int deletedvisits = _connection.SiteVisits.Delete(visit => visit.Id == Id);
            if (deletedvisits == 0)
            {
                throw new Exception ("No visits were deleted");
            
            }
            else if (deletedvisits > 1)
            {
                throw new Exception (deletedvisits + " visits have been deleted" );
            }
          


        }
        public List<SiteVisit> GetSiteVisits(int SiteId)
        {
            return  _connection.SiteVisits.Where(sitevisit => sitevisit.SiteId == SiteId).ToList();

        }

    }

}
