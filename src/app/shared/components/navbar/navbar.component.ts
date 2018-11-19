import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as anime from 'animejs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @ViewChild('name') private name: ElementRef;
    private amount: number;
    private viewBox: string;
    private pathShape: string;
    private pathNav: string;
    private animFinished: boolean;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.amount = (0.6 * (100 - (window.innerWidth * 100 / window.screen.width)) / 100);
        this.viewBox = '0 0 ' + (window.innerWidth - 10) + ' ' + window.innerHeight;
        this.animFinished = false;
        this.pathNav = 'M0,0v60.1c0,0,0,0,0,0L' + window.innerWidth + ',60v0V0c0,0,0,0,0,0H0';

        if (window.innerWidth < 971) {
            this.pathShape = this.pathNav;
            document.querySelector('#morph-container path').setAttribute('d', this.pathNav);
            this.name.nativeElement.style.color = 'white';
            this.shapeConfig();
        } else {
            this.pathShape = 'M' + (window.innerWidth / 100) * 47.3 + ',0v227.2c0,64.8,34.6,124.8,90.8,157.2L' + window.innerWidth + ',' +
                (((window.innerHeight / 100) * 84.8) * (0.98 - this.amount)) + 'v0.1V0H' + (window.innerWidth / 100) * 47.3;
            this.name.nativeElement.style.color = 'black';
            this.shapeConfig();
        }

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && event.url !== '/') {
                // this.shapeAnime();
            }
        });
    }

    public shapeAnime(): void {
        this.pathNav = 'M0,0v60.1c0,0,0,0,0,0L' + window.innerWidth + ',60v0V0c0,0,0,0,0,0H0';

        setTimeout(() => {
            anime({
                targets: '#morph-shape',
                d: this.pathNav,
                easing: [.6, 0, .12, 1.2],
                duration: 800,
                loop: false,
                complete: function (anim) {
                    this.animFinished = true;
                }
            });

            anime({
                targets: '#logo-white',
                opacity: [0, 1],
                easing: 'easeInOutSine',
                duration: 200,
                delay: 450,
            });

            setTimeout(() => {
                this.name.nativeElement.style.color = 'white';
            }, 500);
        }, 0);
    }

    private shapeConfig(): void {
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelector('#morph-container').setAttribute('viewBox', this.viewBox);
            document.querySelector('#morph-container path').setAttribute('d', this.pathShape);
        });

        window.addEventListener('resize', () => {
            this.amount = (0.5 * (100 - (window.innerWidth * 100 / window.screen.width)) / 100);
            this.viewBox = '0 0 ' + window.innerWidth + ' ' + window.innerHeight;
            document.querySelector('#morph-container').setAttribute('viewBox', this.viewBox);

            if (window.innerWidth < 971) {
                this.pathNav = 'M0,0v60.1c0,0,0,0,0,0L' + window.innerWidth + ',60v0V0c0,0,0,0,0,0H0';
                document.querySelector('#morph-container path').setAttribute('d', this.pathNav);
                this.name.nativeElement.style.color = 'white';
            } else {
                if (this.animFinished) {
                    this.pathNav = 'M0,0v60.1c0,0,0,0,0,0L' + window.innerWidth + ',60v0V0c0,0,0,0,0,0H0';
                    document.querySelector('#morph-container path').setAttribute('d', this.pathNav);
                } else {
                    this.pathShape = 'M' + (window.innerWidth / 100) * 47.3 + ',0v227.2c0,64.8,34.6,124.8,90.8,157.2L' + window.innerWidth +
                        ',' + (((window.innerHeight / 100) * 84.8) * (0.98 - this.amount)) + 'v0.1V0H' + (window.innerWidth / 100) * 47.3;
                    document.querySelector('#morph-container path').setAttribute('d', this.pathShape);
                }
                this.name.nativeElement.style.color = 'black';
            }
        });
    }
}
