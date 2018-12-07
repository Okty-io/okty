import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Container from '../../../../core/models/container';

@Component({
    selector: 'app-containers',
    templateUrl: './containers.component.html',
    styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit {

    containers: Container[];

    constructor(private route: ActivatedRoute) {
        this.containers = this.route.snapshot.data.containers;
    }

    ngOnInit() {
        console.log(this.containers);
    }

}
