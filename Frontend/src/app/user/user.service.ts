import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }
  getUsers() {
    return this.http.get<User[]>('/api/user');
  }

  getUser(name: string) {
    return this.http.get<User>(`/api/user/${name}`);
  }


  saveUser(user: User, password: string) {
    return this.http.put(`/api/user/${user.id}`, {
      password: password,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      rideProvider: user.rideProvider,
      email: user.email
    }, {responseType: 'text'}).toPromise();
  }

  grantAdmin(userName: string) {
    return this.http.put(`/api/user/grantadmin/${userName}`, null, {responseType: 'text'}).toPromise();
  }

  revokeAdmin(userName: string) {
    return this.http.put(`/api/user/revokeadmin/${userName}`, null, {responseType: 'text'}).toPromise();
  }

  deleteUser(userId: number) {
    return this.http.delete(`/api/user/${userId}`, {responseType: 'text'}).toPromise();
  }
}
