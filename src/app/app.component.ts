import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { homeAnimation } from './modules/home/pages/home/home.animation';
import { AuthenticationService } from './core/authentication/authentication.service';

@Component({
    selector: 'app-root',
    template: `
        <app-navbar></app-navbar>
        <div [@routeAnimations]="prepareRoute(outlet)" style="min-height: calc(100vh - 427px)">
            <router-outlet #outlet="outlet"></router-outlet>
        </div>
        <app-footer></app-footer>
    `,
    animations: [
        homeAnimation
    ]
})
export class AppComponent implements OnInit {

    constructor(private authentication: AuthenticationService) {
    }

    public ngOnInit(): void {
        this.authentication.checkloggedIn();
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
