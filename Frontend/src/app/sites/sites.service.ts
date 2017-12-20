import { Injectable } from '@angular/core';
import { Site, SiteExtended } from './site';
import { HttpClient } from '@angular/common/http';
import { SiteVisit } from './site-visit';

@Injectable()
export class SitesService {

  constructor(private http: HttpClient) {
  }

  getSites() {
    return this.http.get<Site[]>('/api/site');
  }

  getSite(id: number) {
    return this.http.get<SiteExtended>('/api/site/' + id);
  }

  saveSite(site: Site) {
    return this.http.put<Site>('/api/site/', site);
  }

  saveVisit(siteVisit: SiteVisit) {
    return this.http.put<SiteVisit>('api/site/visit', siteVisit);
  }
}
