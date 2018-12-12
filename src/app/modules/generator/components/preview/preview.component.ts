import { Component, Input, OnInit } from '@angular/core';
import hljs from 'highlight.js/lib';

@Component({
    selector: 'app-generator-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

    preview: string;

    constructor() {
    }

    ngOnInit() {
        this.preview = '';
        hljs.initHighlighting();
    }

    @Input()
    set content(data: string) {
        if (!data) {
            this.preview = '';
        }

        const file = YAML.stringify(data, 8);
        this.preview = hljs.highlight('yaml', file).value;

    }

}
