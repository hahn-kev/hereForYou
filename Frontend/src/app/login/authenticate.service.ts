import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { User } from '../user/user';

@Injectable()
export class AuthenticateService {

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  async login(username: string, password: string) {
    let json = await this.http.post<any>('/api/authenticate/signin', {
      Username: username,
      Password: password
    }).toPromise();
    let user = Object.assign(new User(), json.user);
    this.loginService.setLoggedIn(user, json.access_token);
    return json;
  }

  registerUser(user: User, password: string) {
    return this.http.post('/api/authenticate/register', {
      password: password,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      rideProvider: user.rideProvider
    }).toPromise();
  }
}
