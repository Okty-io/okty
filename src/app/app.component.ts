import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-root',
    template: `
        <app-navbar></app-navbar>
        <div [@routeAnimations]="prepareRoute(outlet)">
            <router-outlet #outlet="outlet"></router-outlet>
        </div>
    `,
    animations: [
        trigger('routeAnimations', [
            transition('HomePage => *', [
                query(':enter, :leave', [
                    style({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%'
                    })
                ]),
                group([
                    query('.column_left', [
                        animate('1s', style({
                            opacity: 0,
                            marginTop: '-200px'
                        }))
                    ])
                ]),
            ])
        ])
    ]
})
export class AppComponent {

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
