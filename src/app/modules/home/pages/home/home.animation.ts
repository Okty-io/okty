import { animate, group, keyframes, query, style, transition, trigger } from '@angular/animations';

export const homeAnimation =
    trigger('routeAnimations', [
        // ENTER HOMEPAGE
        transition('* => HomePage', [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ]),
            group([
                query('#plate', [
                    animate('1.5s ease-out', keyframes([
                        style({opacity: 0, marginTop: '-100px', offset: 0}),
                        style({opacity: 0, marginTop: '-100px', offset: 0.3}),
                        style({opacity: 1, marginTop: '0px', offset: 1})
                    ]))
                ]),
                query('#lines', [
                    animate('1.5s ease-out', keyframes([
                        style({opacity: 0, marginTop: '-200px', offset: 0}),
                        style({opacity: 0, marginTop: '-200px', offset: 0.3}),
                        style({opacity: 1, marginTop: '0px', offset: 1})
                    ]))
                ]),
                query('#cubes', [
                    animate('1.5s ease-out', keyframes([
                        style({opacity: 0, marginTop: '-300px', offset: 0}),
                        style({opacity: 0, marginTop: '-300px', offset: 0.3}),
                        style({opacity: 1, marginTop: '0px', offset: 1})
                    ]))
                ]),
                query('.center-item-left', [
                    animate('2s ease-out', keyframes([
                        style({opacity: 0, offset: 0}),
                        style({opacity: 0, offset: 0.3}),
                        style({opacity: 1, offset: 1})
                    ]))
                ])
            ])
        ]),
        // LEAVE HOMEPAGE
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
                query('#column_left', [
                    animate('1s ease-out', style({
                        opacity: 0,
                        marginTop: '-200px'
                    }))
                ]),
                query('#column_right', [
                    animate('1s ease-out', style({
                        opacity: 0,
                        marginTop: '200px'
                    }))
                ])
            ])
        ])
    ]);
