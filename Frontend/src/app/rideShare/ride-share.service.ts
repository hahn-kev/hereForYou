import {Injectable} from '@angular/core';
import {RideRequest} from './ride-request';
import {Observable} from 'rxjs/Observable'
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class RideShareService {
  constructor(private http: Http) {
  }

  getRequestedRides(): Promise<RideRequest[]> {
    return this.http.get("/api/riderequest").map((value) => value.json()).toPromise<RideRequest[]>();
  }

  createRequest(rideRequest: RideRequest) {
    return this.http.put('/api/riderequest', rideRequest).map((value) => value.json()).toPromise<RideRequest>();
  }

  ridePickedUp(rideRequest: RideRequest) {
    //todo send to api
    rideRequest.completed = true;
  }
}
