import { Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-loader',
    template: `
        <div class="text">
            <div *ngIf="loading">
                <fa-icon [icon]="faSpinner" [spin]="true" [size]="'2x'"></fa-icon>
            </div>
            <div *ngIf="error">
                <span class="error">{{errorMessage}}</span>
            </div>
        </div>
    `,
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

    @Input() loading = true;
    @Input() error = false;
    @Input() errorMessage = 'An error occured while fetching data...';

    faSpinner = faSpinner;
}
