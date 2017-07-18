import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {

  constructor() { }
  getUsers() {
    return Promise.resolve<User[]>([new User('Kevin', '123'), new User('Tom', '456')]);
  }
  async getUser(name: string) {
    // todo use dedicated REST request
    return (await this.getUsers()).filter((user) => user.name === name).pop();
  }
  saveUser(user: User) {
// todo save user
    return Promise.resolve();
  }
}
