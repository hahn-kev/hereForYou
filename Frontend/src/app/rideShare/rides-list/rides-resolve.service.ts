import { Injectable } from '@angular/core';
import { RideRequestUsers } from '../ride-request';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RideShareService } from '../ride-share.service';

@Injectable()
export class RidesResolveService implements Resolve<RideRequestUsers[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RideRequestUsers[]> | Promise<RideRequestUsers[]> | RideRequestUsers[] {
    let id: number = route.params['id'];
    let user: string = route.params['user'];
    if (user == 'driver') {
      return this.rideShareService.rideRequestsForDriver(id);
    } else if (user == 'rider') {
      return this.rideShareService.rideRequestsForRider(id);
    }
    return this.rideShareService.rideRequestsWithUsers();
  }

  constructor(private rideShareService: RideShareService) {
  }

}
