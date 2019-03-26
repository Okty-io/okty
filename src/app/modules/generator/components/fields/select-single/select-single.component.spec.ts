import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSingleComponent } from './select-single.component';

describe('SelectSingleComponent', () => {
  let component: SelectSingleComponent;
  let fixture: ComponentFixture<SelectSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
