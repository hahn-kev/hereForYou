import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/skip";
import "rxjs/add/operator/do";
import { User } from "../user/user";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable()
export class LoginService implements CanActivate {
  private readonly currentUserSubject = new BehaviorSubject<User>(null);
  public redirectTo: string;
  public accessToken: string;

  constructor(private router: Router, private localStorage: LocalStorageService) {
    this.redirectTo = router.routerState.snapshot.url;

    this.accessToken = localStorage.get<string>('accessToken');
    this.currentUserSubject.next(localStorage.get<User>('user'));

    this.loggedIn().skip(1).subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate([this.redirectTo || 'home']);
      }
    });
  }

  promptLogin(redirectTo?: string) {
    this.redirectTo = redirectTo || this.router.routerState.snapshot.url;
    this.router.navigate(['/login']);
  }

  setLoggedIn(user: User, accessToken: string) {

    this.localStorage.set('accessToken', accessToken);
    this.localStorage.set('user', user);
    this.accessToken = accessToken;
    this.currentUserSubject.next(user);
  }

  loggedIn(): Observable<boolean> {
    return this.currentUserSubject.map((user) => user != null && this.accessToken != null);
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
