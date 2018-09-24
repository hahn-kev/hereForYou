import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';

@Injectable()
export class RoleGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //noinspection TypeScriptUnresolvedVariable
    let role = route.data.requireRole;
    if (!role) {
      return true;
    }
    let roles = [];
    if (typeof role === 'string') {
      roles.push(role);
    } else if (role instanceof Array) {
      roles = [...role];
    }
    return this.loginService.hasAnyRole(roles).pipe(tap(hasRole => {
      if (!hasRole) {
        this.snackBarService.open(`Access denied, missing role [${role}]`, 'dismiss', {duration: 2000});
      }
    }));
  }

  constructor(private loginService: LoginService, private snackBarService: MatSnackBar) {
  }

}
