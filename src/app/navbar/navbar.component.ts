import { Component, OnInit } from '@angular/core';
import anime from 'animejs'
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    
    private amount: number;
    private viewBox: string;
    private pathShape: string;
    private pathNav: string;
    private animFinished: boolean;

    constructor(private router: Router) { }

    ngOnInit() {
        this.amount = (0.6 * (100 - (window.innerWidth*100 / window.screen.width)) /100 );
        this.viewBox = "0 0 " + (window.innerWidth - 10) + " " + window.innerHeight;
        this.pathShape = "M" + (window.innerWidth / 100) * 47.3  + ",0v227.2c0,64.8,34.6,124.8,90.8,157.2L" + window.innerWidth + "," + (((window.innerHeight / 100) * 84.8) * (0.98 - this.amount ) ) + "v0.1V0H" + (window.innerWidth / 100) * 47.3;
        this.pathNav = "M0,0v60.1c0,0,0,0,0,0L" + window.innerWidth + ",60v0V0c0,0,0,0,0,0H0";
        this.animFinished = false;

        this.router.events.subscribe( (event) => {
            console.log(event);
        });

        this.shapeConfig();
    }

    private shapeConfig(): void {
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelector("#morph-container").setAttribute("viewBox", this.viewBox); 
            document.querySelector("#morph-container path").setAttribute('d', this.pathShape);
        });

        window.addEventListener('resize', () => {
            this.amount = (0.5 * (100 - (window.innerWidth*100 / window.screen.width)) /100 );
            this.viewBox = "0 0 " + window.innerWidth + " " + window.innerHeight;
            document.querySelector("#morph-container").setAttribute("viewBox", this.viewBox); 
            
            if (this.animFinished) {
                this.pathNav = "M0,0v60.1c0,0,0,0,0,0L" + window.innerWidth + ",60v0V0c0,0,0,0,0,0H0";
                document.querySelector("#morph-container path").setAttribute('d', this.pathNav)
            } else {
                this.pathShape = "M" + (window.innerWidth / 100) * 47.3  + ",0v227.2c0,64.8,34.6,124.8,90.8,157.2L" + window.innerWidth + "," + (((window.innerHeight / 100) * 84.8) * (0.98 - this.amount ) ) + "v0.1V0H" + (window.innerWidth / 100) * 47.3;
                document.querySelector("#morph-container path").setAttribute('d', this.pathShape)
            }
        });
    }

    private shapeAnime(): void {
        this.pathNav = "M0,0v60.1c0,0,0,0,0,0L" + window.innerWidth + ",60v0V0c0,0,0,0,0,0H0";

        document.querySelector('.column_left').classList.toggle('fade-to-bottom');
        document.querySelector('.column_right').classList.toggle('fade-to-top');
        document.querySelector('.mouse').classList.toggle('fade');
        
        setTimeout(() => {
            var morphing = anime({
                targets: '#morph-shape',
                d: this.pathNav,
                easing: [.6, 0, .12, 1.2],
                duration: 800,
                loop: false,
                complete: function(anim) {
                    this.animFinished = true;
                }
            });

            var lineDrawing = anime({
                targets: '#logo-white',
                opacity: [0, 1],
                easing: 'easeInOutSine',
                duration: 200,
                delay: 450,
            });

            setTimeout(() => {
                document.querySelector('.name').style.color = 'white';
            }, 500);
        }, 0);
    }
}
