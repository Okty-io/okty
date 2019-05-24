import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterComponent } from './chapter.component';

describe('ChaptersComponent', () => {
  let component: ChapterComponent;
  let fixture: ComponentFixture<ChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
