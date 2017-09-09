import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login/login.service';
import { User } from './user/user';
import { MdSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { ActivityIndicatorService } from './activity-indicator.service';
import { Subscription } from 'rxjs/Subscription';
import { SettingsService } from './services/settings.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public discourseBaseUrl: string;
  private baseUrlSubscription: Subscription;
  currentUser: Observable<User>;
  indicatorStatus: Observable<boolean>;
  @ViewChild('sidenav')
  private sidenav: MdSidenav;

  constructor(private loginService: LoginService, private router: Router, activityIndicatorService: ActivityIndicatorService, private settingsService: SettingsService) {
    this.currentUser = loginService.observeCurrentUser();
    this.indicatorStatus = activityIndicatorService.observeIndicator();
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => this.sidenav.close());
    this.baseUrlSubscription = this.settingsService.getAsync<string>('discourseBaseUrl').subscribe(url => this.discourseBaseUrl = url);
  }

  logout() {
    this.loginService.setLoggedIn(null, null);
    this.loginService.promptLogin();
  }

  ngOnDestroy(): void {
    this.baseUrlSubscription.unsubscribe();
  }
}
