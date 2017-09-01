import { Injectable } from '@angular/core';
import { RideRequest, RideRequestUsers } from './ride-request';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginService } from '../login/login.service';


@Injectable()
export class RideShareService {
  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  async getRequestedRides(): Promise<RideRequest[]> {
    const rides = await this.http.get<RideRequest[]>('/api/riderequest').toPromise();
    this.processRides(rides);
    return rides;
  }

  createRequest(rideRequest: RideRequest) {
    rideRequest.requestedById = this.loginService.currentUser().id;
    return this.http.put<RideRequest>('/api/riderequest', rideRequest,
      {
        params: new HttpParams().append('timezoneOffset', rideRequest.pickupTime.getTimezoneOffset().toString())
      }
    ).toPromise<RideRequest>();
  }

  rideRequestsByUser(type: string, userName: string) {
    return this.http.get<RideRequestUsers[]>(`/api/riderequest/ridesByUser/${type}/${userName}`).do(this.processRides);
  }

  rideRequestsWithUsers() {
    return this.http.get<RideRequestUsers[]>('/api/riderequest/rideswusers/').do(this.processRides);
  }

  processRides(rides: RideRequest[]) {
    for (const ride of rides) {
      ride.pickupTime = new Date(ride.pickupTime);
    }
  }
}
