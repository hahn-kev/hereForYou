import { Injectable } from '@angular/core';
import { User } from './user';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
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
    }).toPromise();
  }

  grantAdmin(userName: string) {
    return this.http.put(`/api/user/grantadmin/${userName}`, null).toPromise();
  }

  revokeAdmin(userName: string) {
    return this.http.put(`/api/user/revokeadmin/${userName}`, null).toPromise();
  }

  deleteUser(userId: number) {
    return this.http.delete(`/api/user/${userId}`).toPromise();
  }
}
