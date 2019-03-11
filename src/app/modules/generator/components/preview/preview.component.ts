import { Component, Input } from '@angular/core';

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
        this.preview = YAML.stringify(data, 8);
    }
}
