export class User {
  constructor(public userName?: string,
              public phoneNumber?: string,
              public id?: number,
              public rideProvider = false) { }
  // todo have range support
}
