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

  getSelf() {
    return this.http.get<User>('/api/user/self');
  }

  saveUser(user: User, password: string, isNewUser: boolean = false, isSelf: boolean = false) {
    if (isNewUser) {
      return this.registerUser(user, password);
    } else if (isSelf) {
      return this.updateSelf(user, password);
    }
    return this.http.put(`/api/user/${user.id}`, {
      id: user.id,
      password: password,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      rideProvider: user.rideProvider,
      email: user.email,
      approved: user.approved
    }, {responseType: 'text'}).toPromise();
  }

  updateSelf(user: User, password: string) {
    return this.http.put('/api/user/self', {
      id: user.id,
      password: password,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      rideProvider: user.rideProvider,
      email: user.email,
      approved: user.approved
    }, {responseType: 'text'}).toPromise();
  }

  registerUser(user: User, password: string) {
    return this.http.post<any>('/api/authenticate/register', {
      password: password,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      rideProvider: user.rideProvider,
      email: user.email,
      approved: user.approved
    }).toPromise();
  }

  grantAdmin(userName: string, role: string) {
    return this.http.put(`/api/user/grant/${role}/${userName}`, null, {responseType: 'text'}).toPromise();
  }

  revokeAdmin(userName: string, role: string) {
    return this.http.put(`/api/user/revoke/${role}/${userName}`, null, {responseType: 'text'}).toPromise();
  }

  deleteUser(userId: number) {
    return this.http.delete(`/api/user/${userId}`, {responseType: 'text'}).toPromise();
  }
}
