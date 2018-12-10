import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-generator-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

    @Input() content: string;

    preview: string;

    constructor() {
    }

    ngOnInit() {
        this.preview = 'To convert';
    }

}
