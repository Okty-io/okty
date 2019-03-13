import { Component, OnInit } from '@angular/core';
import { ContainerFormData } from '../../interfaces/form-data';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-generator-review-grid',
    templateUrl: './review-grid.component.html',
    styleUrls: ['./review-grid.component.scss']
})
export class ReviewGridComponent implements OnInit {

    containers: Array<ContainerFormData>;

    constructor(private sessionService: SessionService) {
    }

    ngOnInit() {
        this.containers = this.sessionService.getContainers();
    }

}
