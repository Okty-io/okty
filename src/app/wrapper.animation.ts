import { trigger, state, style, transition, animate } from '@angular/animations';

export const wrapperAnimation = trigger('wrapperStatus', [
    state('full', style({
        width: 'calc(100vw)',
        marginLeft: '0px'

    })),
    state('sidebar', style({
        width: 'calc(100vw - 82px)',
        marginLeft: '82px'
    })),
    transition('full => sidebar', animate('.8s cubic-bezier(0.29, 0.69, 0, 1.17)'))
]);
