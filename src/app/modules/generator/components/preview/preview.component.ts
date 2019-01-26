import { Component, Input } from '@angular/core';
import hljs from 'highlight.js/lib';

@Component({
    selector: 'app-generator-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {

    preview = '';
    loading = true;

    @Input()
    set content(data: string) {
        if (data === undefined) {
            this.preview = 'An error occured';
            return;
        }

        this.loading = !data;

        const file = YAML.stringify(data, 8);
        this.preview = hljs.highlight('yaml', file).value;
    }

}
