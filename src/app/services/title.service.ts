import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Injectable()
export class CustomTitleService {
  private default = 'Okty - Create your Docker Projects';
  private separator = ' | ';

  constructor(private titleService: Title) {
  }

  setTitle(title: string) {
    this.titleService.setTitle(title + this.separator + this.default);
  }

  getTitle() {
    this.titleService.getTitle();
  }

  resetTitle() {
    this.titleService.setTitle(this.default);
  }
}
