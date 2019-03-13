import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewActionComponent } from './review-action.component';

describe('ReviewActionComponent', () => {
  let component: ReviewActionComponent;
  let fixture: ComponentFixture<ReviewActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
