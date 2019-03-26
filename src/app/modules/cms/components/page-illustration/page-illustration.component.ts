import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-illustration',
  templateUrl: './page-illustration.component.html',
  styleUrls: ['./page-illustration.component.scss']
})
export class PageIllustrationComponent implements OnInit {
    public cardScale = 1;
    constructor() { }
N
    ngOnInit() {
        this.pageIllustationResize();
        window.addEventListener('resize', this.pageIllustationResize);

    }

    pageIllustationResize () {
        const maxScreenWidth = 1920;
        const percentage = Math.floor((window.innerWidth / maxScreenWidth) * 100);
        if (window.innerWidth < maxScreenWidth && percentage > 50) {
            this.cardScale = percentage / 100;
            const pageIllustration = document.querySelector('.page-illustration-container');
            const min = -20;
            const max = 180;
            const translateX = ( ( (1 - this.cardScale ) * 100) * (max - min) / 100) + min;
            (pageIllustration as any).style.transform = 'scale(' + this.cardScale + ') translateX(' + translateX + '%)';
        }
    }

}
