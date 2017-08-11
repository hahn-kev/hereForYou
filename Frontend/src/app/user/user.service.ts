import { Injectable } from "@angular/core";
import { User } from "./user";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }
  getUsers() {
    return this.http.get<User[]>('/api/user').toPromise<User[]>();
    // return Promise.resolve<User[]>(this.users);
  }
  async getUser(name: string) {
    // todo use dedicated REST request
    return (await this.getUsers()).filter((user) => user.userName === name).pop();
  }
  saveUser(user: User) {
    // todo save user
    return this.http.put('/api/user', user).toPromise();
  }
}
