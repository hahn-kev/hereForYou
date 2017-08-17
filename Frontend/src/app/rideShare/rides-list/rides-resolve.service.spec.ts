import { inject, TestBed } from '@angular/core/testing';

import { RidesResolveService } from './rides-resolve.service';

describe('RidesResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RidesResolveService]
    });
  });

  it('should be created', inject([RidesResolveService], (service: RidesResolveService) => {
    expect(service).toBeTruthy();
  }));
});
