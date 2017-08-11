import { Injectable } from "@angular/core";
import { RideRequest } from "./ride-request";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class RideShareService {
  constructor(private http: HttpClient) {
  }

  getRequestedRides(): Promise<RideRequest[]> {
    return this.http.get<RideRequest[]>('/api/riderequest').toPromise();
  }

  createRequest(rideRequest: RideRequest) {
    return this.http.put<RideRequest>('/api/riderequest', rideRequest).toPromise();
  }

  ridePickedUp(rideRequest: RideRequest) {
    //todo send to api
    rideRequest.completed = true;
  }
}
