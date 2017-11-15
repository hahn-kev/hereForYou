﻿import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login/login.service';
import { User } from './user/user';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { ActivityIndicatorService } from './activity-indicator.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUser: Observable<User>;
  indicatorStatus: Observable<boolean>;
  @ViewChild('sidenav')
  private sidenav: MatSidenav;

  constructor(private loginService: LoginService,
              private router: Router,
              private cookieService: CookieService,
              activityIndicatorService: ActivityIndicatorService) {
    this.currentUser = loginService.observeCurrentUser();
    this.indicatorStatus = activityIndicatorService.observeIndicator();
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => this.sidenav.close());
  }

  logout() {
    this.loginService.setLoggedIn(null, null);
    this.cookieService.remove('.JwtAccessToken');
    this.loginService.promptLogin();
  }

}
