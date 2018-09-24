import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private router: Router) {
    this.refresh();
  }

  ngOnInit() {
  }

  async refresh() {
    this.users = await this.userService.getUsers().toPromise();

  }
}
