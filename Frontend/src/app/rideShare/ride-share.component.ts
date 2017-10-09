import { Component } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { RideRequest } from './ride-request';
import { RideShareService } from './ride-share.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-share',
  templateUrl: './ride-share.component.html',
  styleUrls: ['./ride-share.component.scss']
})
export class RideShareComponent {
  request = new RideRequest();
  times: Date[];
  time: Date;
  date: Date;
  minDate = new Date();

  constructor(private rideShareService: RideShareService, private snackBar: MatSnackBar, private route: Router) {
    //create a list of dates to display in the drop down, currently in 30 minute increments
    this.times = new Array(24 * 2).fill(0).map((value, index) => {
      const date = new Date();
      date.setHours((index + 2 - (index % 2)) / 2, index % 2 * 30);
      return date;
    });
    const now = new Date();
    this.date = now;
    let distance = Number.MAX_SAFE_INTEGER;
    //find the first time to come after now.
    this.times.forEach(time => {
      if (time.getTime() > now.getTime() && (time.getTime() - now.getTime()) < distance) {
        this.time = time;
        distance = time.getTime() - now.getTime();
      }
    });
  }

  async createRequest() {
    //set pickup time based on date and time pickers
    this.request.pickupTime = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.time.getHours(), this.time.getMinutes());
    await this.rideShareService.createRequest(this.request);
    this.snackBar.open('Your ride has been requested, expect a confirmation text once someone has accepted to drive you', 'Dismiss');
    this.route.navigate(['/home']);

  }
}
