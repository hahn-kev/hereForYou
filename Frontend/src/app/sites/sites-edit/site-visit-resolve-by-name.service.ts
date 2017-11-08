import { Injectable } from '@angular/core';
import { SitesService } from '../sites.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SiteVisit } from '../site-visit';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SiteVisitResolveByNameService implements Resolve<SiteVisit[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SiteVisit[]> | Promise<SiteVisit[]> | SiteVisit[] {
    return this.sitesService.getVisits(route.data['name']);
  }

  constructor(private sitesService: SitesService) {
  }

}
