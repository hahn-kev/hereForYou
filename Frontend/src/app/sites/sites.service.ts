import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Site } from './site';
import 'rxjs/add/observable/of';

@Injectable()
export class SitesService {

  constructor() {
  }

  getSites() {
    return Observable.of([new Site('Cook st', new Date()), new Site('Broadway', new Date())]);
  }
}
