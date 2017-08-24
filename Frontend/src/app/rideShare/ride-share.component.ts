import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import 'rxjs/add/operator/toPromise';

import { RequestDialogComponent } from './request-dialog/request-dialog.component';
import { RideRequest } from './ride-request';
import { RideShareService } from './ride-share.service';

@Component({
  selector: 'app-ride-share',
  templateUrl: './ride-share.component.html',
  styleUrls: ['./ride-share.component.css']
})
export class RideShareComponent implements OnInit {
  rideRequests: RideRequest[] = [];
  constructor(private rideShareService: RideShareService, private dialog: MdDialog) {

  }
  ngOnInit(): void {
    this.loadRides();
  }
  async loadRides() {
    this.rideRequests = await this.rideShareService.getRequestedRides();
  }
  async openRideRequestDialog() {
    const rideRequest: any = await this.dialog.open(RequestDialogComponent).afterClosed().toPromise();
    if (rideRequest == null || rideRequest === '') {
      return;
    }
    this.rideRequests.push(rideRequest);
  }
}
