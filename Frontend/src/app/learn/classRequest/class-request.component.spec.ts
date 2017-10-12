import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRequestComponent } from './class-request.component';

describe('ClassRequstComponent', () => {
  let component: ClassRequestComponent;
  let fixture: ComponentFixture<ClassRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassRequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
