import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    template: `
        <button type="button" class="{{type}} {{size}}" [disabled]="disabled">
            <ng-content></ng-content>
        </button>
    `,
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

    @Input() type = 'primary';
    @Input() size = 'medium';

    @Input() disabled = false;
}
