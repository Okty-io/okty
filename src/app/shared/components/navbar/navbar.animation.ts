import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';

export const navbarAnimation =
    trigger('routeAnimations', [
        // ENTER HOMEPAGE
        transition('* => navBar', [
            query('.navbar .navbar-right a', [
                stagger(100, [
                    animate('1s ease-in-out', keyframes([
                        style({opacity: 0, lineHeight: '0px', offset: 0}),
                        style({opacity: 1, lineHeight: '60px', offset: 1})
                    ]))
                ])
            ]),
        ]),
    ]);
