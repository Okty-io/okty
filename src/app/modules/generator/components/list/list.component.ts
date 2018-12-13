import { Component, Input } from '@angular/core';
import { Listable } from '../../interfaces/listable';

@Component({
    selector: 'app-generator-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {

    @Input() elements: Listable[];

    constructor() {
    }
}
