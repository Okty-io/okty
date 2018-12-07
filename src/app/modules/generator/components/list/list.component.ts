import { Component, Input, OnInit } from '@angular/core';
import Listable from '../../../../core/interfaces/listable';

@Component({
    selector: 'app-generator-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    @Input() elements: Array<Listable>;

    constructor() {
    }

    ngOnInit() {
        console.log(this.elements);
    }

}
