import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { User } from "./user";
import { UserService } from "./user.service";

@Injectable()
export class UserResolveService implements Resolve<User> {

  constructor(private userService: UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Promise<User> {
    const username = route.params['name'];
    if (username === 'new') {
      return new User();
    }
    return this.userService.getUser(username);
  }
}
