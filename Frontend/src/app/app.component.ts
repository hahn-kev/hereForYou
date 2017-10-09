import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login/login.service';
import { User } from './user/user';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { ActivityIndicatorService } from './activity-indicator.service';
import { SettingsService } from './services/settings.service';

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

  constructor(private loginService: LoginService, private router: Router, activityIndicatorService: ActivityIndicatorService, private settingsService: SettingsService) {
    this.currentUser = loginService.observeCurrentUser();
    this.indicatorStatus = activityIndicatorService.observeIndicator();
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => this.sidenav.close());
  }

  logout() {
    this.loginService.setLoggedIn(null, null);
    this.loginService.promptLogin();
  }

}
