export class User {
  constructor(
    public name?: string,
    public phoneNumber?: string,
    public password?: string,
    public rideProvider = false) { }
  // todo have range support
}
