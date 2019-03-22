import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TitleService {

    private separator = ' - ';
    private suffix = 'Okty';

    constructor(private title: Title) {
        this.set('');
    }

    set(title: string): void {
        this.title.setTitle(title ? title + this.separator + this.suffix : this.suffix);
    }

    get(): string {
        return this.title.getTitle();
    }
}
