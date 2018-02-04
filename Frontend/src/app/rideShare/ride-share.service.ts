import { Injectable } from '@angular/core';
import { RideRequest, RideRequestUsers } from './ride-request';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


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

  rideRequestsByUser(type: string, userName: string): Observable<RideRequestUsers[]> {
    return this.http.get<RideRequestUsers[]>(`/api/riderequest/ridesByUser/${type}/${userName}`)
      .pipe(tap<RideRequestUsers[]>(this.processRides));
  }

  rideRequestsWithUsers(): Observable<RideRequestUsers[]> {
    return this.http.get<RideRequestUsers[]>('/api/riderequest/rideswusers/')
      .pipe(tap<RideRequestUsers[]>(this.processRides));
  }

  processRides(rides: RideRequest[] | RideRequestUsers[]) {
    for (const ride of rides) {
      ride.pickupTime = new Date(ride.pickupTime);
    }
  }
}
