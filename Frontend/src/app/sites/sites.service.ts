import { Injectable } from '@angular/core';
import { Site, SiteAgg, SiteExtended } from './site';
import { HttpClient } from '@angular/common/http';
import { SiteVisit } from './site-visit';

@Injectable()
export class SitesService {

  constructor(private http: HttpClient) {
  }

  getSites() {
    return this.http.get<SiteAgg[]>('/api/site');
  }

  getSite(id: number) {
    return this.http.get<SiteExtended>('/api/site/' + id);
  }

  saveSite(site: Site) {
    return this.http.put<Site>('/api/site/', site);
  }

  saveVisit(siteVisit: SiteVisit) {
    return this.http.put<SiteVisit>('/api/site/visit', siteVisit);
  }

  deleteSite(id: number) {
    return this.http.delete('/api/site/' + id, {responseType: 'text'});
  }

  deleteVisit(id: number) {
    return this.http.delete('/api/site/visit/' + id, {responseType: 'text'});

  }
}
