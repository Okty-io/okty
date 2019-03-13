import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewGridComponent } from './review-grid.component';

describe('ReviewGridComponent', () => {
  let component: ReviewGridComponent;
  let fixture: ComponentFixture<ReviewGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
