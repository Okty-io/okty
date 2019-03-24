import { Component, OnInit } from '@angular/core';
import * as anime from 'animejs';
import { TitleService } from '../../../../core/services/title.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public cardScale = 1;
    private relativeOffset = anime.timeline({
        loop: true
    });

    constructor(private titleService: TitleService) {
    }

    ngOnInit() {
        this.titleService.set('Home');
    }

    public animeIso(): void {
        setTimeout(() => {
            (document.querySelector('.planche-anim') as any).style.opacity = 1;
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
