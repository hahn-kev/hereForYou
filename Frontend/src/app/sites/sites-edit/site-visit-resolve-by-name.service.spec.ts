import { inject, TestBed } from '@angular/core/testing';

import { SiteVisitResolveByNameService } from './site-visit-resolve-by-name.service';

describe('SiteVisitResolveByNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteVisitResolveByNameService]
    });
  });

  it('should be created', inject([SiteVisitResolveByNameService], (service: SiteVisitResolveByNameService) => {
    expect(service).toBeTruthy();
  }));
});
