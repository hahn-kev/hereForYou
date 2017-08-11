import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login.service";
import { User } from "../user/user";

@Injectable()
export class AuthenticateService {

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  login(username: string, password: string): Observable<boolean> {
    this.http.post<any>('/api/authenticate/signin', {
      Username: username,
      Password: password
    })
      .subscribe((json) => {
        let user = Object.assign(new User(), json.user);
        this.loginService.setLoggedIn(user, json.access_token);
      });
    return this.loginService.loggedIn();
  }
}
