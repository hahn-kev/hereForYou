export class RideRequest {
  id: number;
  source: string;
  destination: string;
  pickupTime: Date;
  completed = false;
  requestedById: number;
  acceptedById?: number;
  constructor(init?: Partial<RideRequest>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}

export class RideRequestUsers extends RideRequest {
  acceptedByUser: string;
  requestedByUser: string;
}
