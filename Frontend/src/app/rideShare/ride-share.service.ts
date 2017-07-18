import { Injectable } from '@angular/core';
import { RideRequest } from './ride-request';


@Injectable()
export class RideShareService {
  requests: RideRequest[] = []
  lastId = 0
  constructor() { }
  getRequestedRides(): Promise<RideRequest[]> {
    return Promise.resolve(this.requests.slice());
  }
  createRequest(rideRequest: RideRequest) {
    rideRequest.id = ++this.lastId;
    this.requests.push(rideRequest);
    return rideRequest;
  }
  ridePickedUp(rideRequest: RideRequest) {
    rideRequest.completed = true;
  }
}
