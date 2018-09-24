export class User {
  constructor(public userName?: string,
              public phoneNumber?: string,
              public email?: string,
              public id?: number,
              public rideProvider = false,
              public isAdmin = false,
              public resetPassword = false,
              public isManager = false) {
  }
  // todo have range support
}
