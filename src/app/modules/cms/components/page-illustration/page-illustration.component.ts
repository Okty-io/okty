import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-illustration',
  templateUrl: './page-illustration.component.html',
  styleUrls: ['./page-illustration.component.scss']
})
export class PageIllustrationComponent implements OnInit {
    public cardScale = 1;
    constructor() { }

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
            let translateX = (1 - this.cardScale) * 100;
            translateX += (10 / 100) * (this.cardScale * 100);
            pageIllustration.style.transform = 'scale(' + this.cardScale + ') translateX(' + translateX + '%)';
        }
    }

}
