import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageIllustrationComponent } from './page-illustration.component';

describe('PageIllustrationComponent', () => {
  let component: PageIllustrationComponent;
  let fixture: ComponentFixture<PageIllustrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageIllustrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
