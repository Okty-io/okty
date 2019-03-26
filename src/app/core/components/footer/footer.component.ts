import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    year: number;

    constructor() {
    }

    ngOnInit() {
        const date = new Date();
        this.year = date.getFullYear();
    }
}
