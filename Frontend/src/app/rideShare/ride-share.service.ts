import { Injectable } from '@angular/core';
import { RideRequest } from './ride-request';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';


@Injectable()
export class RideShareService {
  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  getRequestedRides(): Promise<RideRequest[]> {
    return this.http.get<RideRequest[]>('/api/riderequest').toPromise();
  }

  createRequest(rideRequest: RideRequest) {
    rideRequest.requestedById = this.loginService.currentUser().id;
    return this.http.put<RideRequest>('/api/riderequest', rideRequest).toPromise<RideRequest>();
  }

  ridePickedUp(rideRequest: RideRequest) {
    //todo send to api
    rideRequest.completed = true;
  }
}
