import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService implements CanActivate {
  public loggedIn = !environment.production;
  public redirectTo: string;
  constructor(private router: Router) { }
  promptLogin(redirectTo?: string) {
    this.redirectTo = redirectTo;
    this.router.navigate(['/login']);
  }
  async login(username: string, password: string): Promise<boolean> {
    //todo actually login
    this.loggedIn = await Observable.of(true).delay(1000).toPromise();
    if (this.loggedIn) {
      this.router.navigate([this.redirectTo || '']);
    }
    return this.loggedIn;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.loggedIn) {
      return true;
    }
    this.promptLogin(state.url);
    return false;
  }
}
