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
    for (const ride of rides) {
      ride.pickupTime = new Date(ride.pickupTime);
    }
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

  rideRequestsForDriver(driverId: number) {
    return this.http.get('/api/riderequest/ridesbydriver/' + driverId).toPromise<RideRequestUsers[]>()
  }

  rideRequestsForRider(riderId: number) {
    return this.http.get('/api/riderequest/ridesbyrider/' + riderId).toPromise<RideRequestUsers[]>()
  }

  rideRequestsWithUsers() {
    return this.http.get('/api/riderequest/rideswusers/').toPromise<RideRequestUsers[]>()
  }
}
