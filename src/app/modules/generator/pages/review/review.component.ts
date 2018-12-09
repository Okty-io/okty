import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../core/services/session.service';
import { FormFieldData } from '../../../../core/interfaces/form-field-data';

@Component({
    selector: 'app-generator-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

    containers: Array<FormFieldData[]>;

    constructor(private sessionService: SessionService) {

    }

    ngOnInit(): void {
        this.containers = this.sessionService.getContainers();
        console.log(this.containers);
    }

}
