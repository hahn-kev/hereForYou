import { TestBed, inject } from '@angular/core/testing';

import { RideShareService } from './ride-share.service';

describe('RideShareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RideShareService]
    });
  });

  it('should be created', inject([RideShareService], (service: RideShareService) => {
    expect(service).toBeTruthy();
  }));
});
