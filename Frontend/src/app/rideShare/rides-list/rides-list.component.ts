import { Component, OnInit } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RideRequestUsers } from '../ride-request';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounceTime';
import { User } from '../../user/user';

@Component({
  selector: 'app-rides-list',
  templateUrl: './rides-list.component.html',
  styleUrls: ['./rides-list.component.scss']
})
export class RidesListComponent implements OnInit {
  dataSource: RidesDataSource;
  userId: number;
  userView: string;
  users: User[];

  constructor(private route: ActivatedRoute, private router: Router, private snackService: MdSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new RidesDataSource();
    this.route.data.combineLatest(this.route.params).debounceTime(5).subscribe(values => {
      let rides: RideRequestUsers[] = values[0]['rides'];
      this.userId = +values[1]['id'];
      this.userView = values[1]['user'];
      this.dataSource.ObserverData.next(rides);
    });
  }

  setUserId(id: number) {
    this.router.navigate(['/ride-share/admin/', this.userView || 'rider', id]);
  }

  setUserView(userView: string) {
    this.router.navigate(['/ride-share/admin/', userView, this.userId]);
  }

  // async refreshData() {
  //   this.dataSource.ObserverData.next(await this.rideShareService.rideRequestsForDriver(1));
  // }

}

export class RidesDataSource extends DataSource<RideRequestUsers> {
  public ObserverData = new BehaviorSubject<RideRequestUsers[]>([]);

  constructor() {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<RideRequestUsers[]> {
    return this.ObserverData.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
