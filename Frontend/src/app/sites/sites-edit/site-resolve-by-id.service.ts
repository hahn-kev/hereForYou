import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SiteExtended } from '../site';
import { Observable } from 'rxjs/Observable';
import { SitesService } from '../sites.service';

@Injectable()
export class SiteResolveByIdService implements Resolve<SiteExtended> {
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<SiteExtended> | Promise<SiteExtended> | SiteExtended {
    if (route.params['id'] == 'new') return new SiteExtended();
    return this.sitesService.getSite(route.params['id']);
  }
  constructor(private sitesService: SitesService) {
  }

}
