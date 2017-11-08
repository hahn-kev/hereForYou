import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Site } from './site';
import 'rxjs/add/observable/of';
import { SiteVisit } from './site-visit';

@Injectable()
export class SitesService {

  constructor() {
  }

  getSites() {
    return Observable.of([new Site('Cook st', new Date()), new Site('Broadway', new Date())]);
  }

  getSite(name: string) {
    return Observable.of(new Site('Cook st', new Date()));
  }

  getVisits(siteName: string) {
    return Observable.of([new SiteVisit(new Date(), 'sally', true), new SiteVisit(new Date(), 'april', false)]);
  }
}
