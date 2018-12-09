import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidComponent } from './void.component';

describe('VoidComponent', () => {
  let component: VoidComponent;
  let fixture: ComponentFixture<VoidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
