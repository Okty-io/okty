import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { homeAnimation } from './modules/cms/pages/home/home.animation';
import { AuthenticationService } from './core/authentication/authentication.service';
import { CookieConsentService } from './core/services/cookie-consent.service';
import { AnalyticsService } from './core/services/analytics.service';

@Component({
    selector: 'app-root',
    template: `
        <app-navbar></app-navbar>
        <div [@routeAnimations]="prepareRoute(outlet)" style="min-height: calc(100% - 427px)">
            <router-outlet #outlet="outlet"></router-outlet>
        </div>
        <app-footer></app-footer>
    `,
    styleUrls: ['./app.component.scss'],
    animations: [
        homeAnimation
    ]
})
export class AppComponent implements OnInit {

    constructor(
        private authentication: AuthenticationService,
        private cookieConsent: CookieConsentService,
        private analytics: AnalyticsService
    ) {
    }

    public ngOnInit(): void {
        this.authentication.checkloggedIn();
        this.cookieConsent.init();
        this.analytics.init();
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
