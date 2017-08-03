import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { RideShareService } from '../ride-share.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { RideRequest } from '../ride-request';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css']
})
export class RequestDialogComponent {
  request = new RideRequest();
  times: Date[];
  time: Date;
  constructor(private rideShareService: RideShareService,
    private dialog: MdDialogRef<RequestDialogComponent>,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
      //create a list of dates to display in the drop down, currently in 30 minute increments
    this.times = new Array(24 * 2).fill(0).map((value, index) => {
      const date = new Date();
      date.setHours((index + 2 - (index % 2)) / 2, index % 2 * 30);
      return date;
    });

    const now = new Date();
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
    this.request.createdTime = this.time;
    this.request = await this.rideShareService.createRequest(this.request);
    this.dialog.close(this.request);
  }
}
