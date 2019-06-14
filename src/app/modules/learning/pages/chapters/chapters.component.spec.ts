import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersComponent } from './chapters.component';

describe('ChaptersComponent', () => {
  let component: ChaptersComponent;
  let fixture: ComponentFixture<ChaptersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaptersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
