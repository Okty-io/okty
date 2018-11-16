import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { homeAnimation } from './modules/home/pages/home/home.animation';
import { navbarAnimation } from './shared/components/navbar/navbar.animation';

@Component({
    selector: 'app-root',
    template: `
        <div [@routeAnimations]="prepareRoute(outlet)">
            <app-navbar></app-navbar>
            <router-outlet #outlet="outlet"></router-outlet>
        </div>
    `,
    animations: [
        // navbarAnimation,
        homeAnimation
    ]
})
export class AppComponent {

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
