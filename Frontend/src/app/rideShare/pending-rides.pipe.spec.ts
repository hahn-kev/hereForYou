import { PendingRidesPipe } from './pending-rides.pipe';
import { RideRequest } from './ride-request';

describe('PendingRidesPipe', () => {
  it('create an instance', () => {
    const pipe = new PendingRidesPipe();
    expect(pipe).toBeTruthy();
  });
  it('is does not throw with null values', () => {
    const pipe = new PendingRidesPipe();
    expect(() => pipe.transform(null)).not.toThrow();
  });
  it('does\'nt include completed ride requests', () => {
    const pipe = new PendingRidesPipe();
    const requests = [ new RideRequest({'source': '1', 'completed': true}), new RideRequest({'source': '2', 'completed': false})];
    expect(requests[0].completed).toBeTruthy();
    expect(requests[1].completed).toBeFalsy();
    const filterResult = pipe.transform(requests);
    expect(filterResult.length).toEqual(1);
    const request = filterResult[0];
    expect(request.source).toEqual('2');

  });
});
