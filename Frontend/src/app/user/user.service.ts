import { Injectable } from '@angular/core';
import { User } from './user';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private http: Http) { }
  getUsers() {
    return this.http.get('/api/user').map((value) => value.json()).toPromise<User[]>();
    // return Promise.resolve<User[]>(this.users);
  }
  async getUser(name: string) {
    // todo use dedicated REST request
    return (await this.getUsers()).filter((user) => user.name === name).pop();
  }
  saveUser(user: User) {
    // todo save user
    return this.http.put('/api/user', user).toPromise();
  }
}
