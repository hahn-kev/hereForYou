import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesDashboardComponent } from './sites-dashboard.component';

describe('SitesDashboardComponent', () => {
  let component: SitesDashboardComponent;
  let fixture: ComponentFixture<SitesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SitesDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
