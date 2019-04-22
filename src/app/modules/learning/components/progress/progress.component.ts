import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-learning-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

    @Input() percentage: number;

    constructor() {

    }

    ngOnInit() {
        if (!this.percentage) {
            this.percentage = 0;
        }

        if (this.percentage < 0) {
            this.percentage = 0;
        }

        if (this.percentage > 100) {
            this.percentage = 100;
        }
    }

}
