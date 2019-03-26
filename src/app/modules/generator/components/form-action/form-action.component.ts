import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-generator-form-action',
    templateUrl: './form-action.component.html',
    styleUrls: ['./form-action.component.scss']
})
export class FormActionComponent {

    @Input() remove: Function;
    @Input() formInvalid: boolean;

    constructor(private location: Location) {
    }

    public goBack(): void {
        this.location.back();
    }

    @Input()
    public submit() {

    }
}
