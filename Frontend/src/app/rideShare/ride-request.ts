export class RideRequest {
  id: number;
  source: string;
  destination: string;
  createdTime: Date;
  completed = false;
  constructor(init?: Partial<RideRequest>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}