import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Site } from '../site';
import { Observable } from 'rxjs/Observable';
import { SitesService } from '../sites.service';

@Injectable()
export class SiteResolveByNameService implements Resolve<Site> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Site> | Promise<Site> | Site {
    return this.sitesService.getSite(route.params['name']);
  }

  constructor(private sitesService: SitesService) {
  }

}
