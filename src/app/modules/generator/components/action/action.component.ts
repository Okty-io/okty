import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-generator-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent {

    @Input() submit: Function;
    @Input() remove: Function;

    constructor(private location: Location) {
    }

    public goBack(): void {
        this.location.back();
    }

}
