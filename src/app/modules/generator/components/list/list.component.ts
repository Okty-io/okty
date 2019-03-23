import { Component, Input } from '@angular/core';
import { Listable } from '../../interfaces/listable';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

@Component({
    selector: 'app-generator-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {

    @Input() elements: Listable[];
    faSpinner = faSpinner;

    constructor() {
    }
}
