import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesEditComponent } from './sites-edit.component';

describe('SitesEditComponent', () => {
  let component: SitesEditComponent;
  let fixture: ComponentFixture<SitesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SitesEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
