import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/skip';
import { environment } from '../../environments/environment';
import { User } from '../user/user';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService implements CanActivate {
  private dummyUser = new User('Tim', '8052860614');
  private readonly currentUserSubject = new BehaviorSubject<User>(null);
  public redirectTo: string;
  constructor(private router: Router) {
    this.redirectTo = router.routerState.snapshot.url;
    if (!environment.production) {
      this.currentUserSubject.next(this.dummyUser);
    } else {
      //todo get logged in state from cookie
    }
    this.loggedIn().skip(1).subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate([this.redirectTo || 'home']);
      }
    });
  }
  promptLogin(redirectTo?: string) {
    this.redirectTo = redirectTo;
    this.router.navigate(['/login']);
  }
  login(username: string, password: string): Observable<boolean> {
    //todo actually login

    (Observable.of(true).delay(1000).map(() => new User(username, this.dummyUser.phoneNumber)))
      .subscribe((user) => this.currentUserSubject.next(user));

    return this.loggedIn();
  }
  loggedIn(): Observable<boolean> {
    return this.currentUserSubject.map((user) => user != null);
  }
  currentUser() {
    return this.currentUserSubject.asObservable();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loggedIn().map(loggedIn => {
      if (!loggedIn) {
        this.promptLogin(state.url);
      }
      return loggedIn;
    });
  }
}
