import { Pipe, PipeTransform } from '@angular/core';
import { RideRequest } from './ride-request';

@Pipe({
  name: 'pendingRides',
  pure: false
})
export class PendingRidesPipe implements PipeTransform {

  transform(requests: RideRequest[], args?: any): any {
    if (!requests) {
      return requests;
    }
    return requests.filter((request: RideRequest) => !request.completed);
  }

}
