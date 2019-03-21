import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

@Injectable({
    providedIn: CoreModule
})
export class CookieConsentService {

    constructor(private ccService: NgcCookieConsentService) {
    }

    public init(): void {
        this.ccService.initialize$.subscribe(() => {});
    }
}
