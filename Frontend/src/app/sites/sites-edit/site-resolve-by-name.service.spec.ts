import { inject, TestBed } from '@angular/core/testing';

import { SiteResolveByNameService } from './site-resolve-by-name.service';

describe('SiteResolveByNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteResolveByNameService]
    });
  });

  it('should be created', inject([SiteResolveByNameService], (service: SiteResolveByNameService) => {
    expect(service).toBeTruthy();
  }));
});
