import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    template: `
        <button type="button" class="{{type}} {{size}}">
            <ng-content></ng-content>
        </button>
    `,
    styles: [
        'button { border: none; font-family: \'Open Sans\', sans-serif; cursor: pointer; }',
        '.primary { background: #3D68DD; color: #FFF }',
        '.light { background: #FFF; color: #000; border: 1px solid rgba(120, 120, 120, 0.5); }',
        '.danger { background: #D80303; color: #FFF;}',
        '.small { }',
        '.medium { padding: 10px 25px; border-radius: 30px; }',
        '.large { }',
    ]
})
export class ButtonComponent {

    @Input() type = 'primary';
    @Input() size = 'medium';
}
