import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as anime from 'animejs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private relativeOffset = anime.timeline({
        loop: true
    });

    constructor() {
    }

    ngOnInit() {
    }

    public animeIso(): void {
        setTimeout(() => {
            document.querySelector('.planche-anim').style.opacity = 1;
            this.relativeOffset
                .add({
                    targets: 'svg .cls-1 #Calque_2 #Calque_12 .gr1',
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeInQuint',
                    duration: 1000
                })
                .add({
                    targets: 'svg .cls-1 #Calque_2 #Calque_12 #line4',
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeOutExpo',
                    duration: 1000
                })
                .add({
                    targets: 'svg .cls-1 #Calque_2 #Calque_12 #line5',
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeOutExpo',
                    duration: 1000,
                    offset: '-=1000'
                })
                .add({
                    targets: 'svg .cls-1 #Calque_2 #Calque_12 #line6',
                    strokeDashoffset: [anime.setDashoffset, 0],
                    easing: 'easeOutExpo',
                    duration: 1000,
                    offset: '-=500'
                })
                .add({
                    targets: 'svg .cls-1 #Calque_2 #Calque_12',
                    easing: 'easeOutExpo',
                    duration: 800,
                    opacity: 0
                });
        }, 1500);
    }
}
