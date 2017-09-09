export class User {
  constructor(public userName?: string,
              public phoneNumber?: string,
              public email?: string,
              public id?: number,
              public rideProvider = false,
              public isAdmin = false) {
  }
  // todo have range support
}
