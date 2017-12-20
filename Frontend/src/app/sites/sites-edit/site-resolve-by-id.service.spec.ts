import { inject, TestBed } from '@angular/core/testing';

import { SiteResolveByIdService } from './site-resolve-by-id.service';

describe('SiteResolveByIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteResolveByIdService]
    });
  });

  it('should be created', inject([SiteResolveByIdService], (service: SiteResolveByIdService) => {
    expect(service).toBeTruthy();
  }));
});
