import { Injectable } from '@angular/core';
import { RideRequestUsers } from '../ride-request';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RideShareService } from '../ride-share.service';

@Injectable()
export class RidesResolveService implements Resolve<RideRequestUsers[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RideRequestUsers[]> | Promise<RideRequestUsers[]> | RideRequestUsers[] {
    let userName: string = route.params['userName'];
    let type: string = route.params['type'];
    if (userName && userName !== 'all') {
      return this.rideShareService.rideRequestsByUser(type, userName);
    }
    return this.rideShareService.rideRequestsWithUsers();
  }

  constructor(private rideShareService: RideShareService) {
  }

}
