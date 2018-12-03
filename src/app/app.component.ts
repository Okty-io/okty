import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { homeAnimation } from './modules/home/pages/home/home.animation';

@Component({
    selector: 'app-root',
    template: `
        <div [@routeAnimations]="prepareRoute(outlet)" style="min-height: 100vh">
            <app-navbar></app-navbar>
            <router-outlet #outlet="outlet"></router-outlet>
        </div>
        <app-footer></app-footer>
    `,
    animations: [
        homeAnimation
    ]
})
export class AppComponent {

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
