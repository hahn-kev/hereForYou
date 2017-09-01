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
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-rides-list',
  templateUrl: './rides-list.component.html',
  styleUrls: ['./rides-list.component.scss']
})
export class RidesListComponent implements OnInit {
  dataSource: RidesDataSource;
  userName: string;
  userView: string;
  users: Observable<User[]>;

  constructor(private route: ActivatedRoute, private router: Router, private snackService: MdSnackBar, private userService: UserService) {
  }

  ngOnInit() {
    this.dataSource = new RidesDataSource();
    this.route.data.combineLatest(this.route.params).debounceTime(5).subscribe(values => {
      let rides: RideRequestUsers[] = values[0]['rides'];
      this.userName = values[1]['userName'] || 'all';
      this.userView = values[1]['type'] || 'any';
      this.dataSource.ObserverData.next(rides);
    });
    this.users = this.userService.getUsers();
  }

  setUserName(userName: string) {
    if (userName) {
      this.router.navigate(['/ride-share/admin/', this.userView, userName]);
    } else {
      this.router.navigate(['/ride-share/admin/', this.userView]);
    }
  }

  setUserView(userView: string) {
    this.router.navigate(['/ride-share/admin/', userView, this.userName]);
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
