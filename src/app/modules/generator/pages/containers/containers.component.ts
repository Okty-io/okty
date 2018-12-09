import { Component, OnDestroy, OnInit } from '@angular/core';
import Container from '../../../../core/models/container';
import { ContainerService } from '../../../../core/services/container.service';

@Component({
    selector: 'app-containers',
    templateUrl: './containers.component.html',
    styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit, OnDestroy {

    containers: Container[];

    private subscribeContainers;

    constructor(private containerService: ContainerService) {
    }

    ngOnInit() {
        this.containers = null;
        this.containerService.getAll().subscribe((containers: Container[]) => this.containers = containers);
    }

    ngOnDestroy() {
        this.subscribeContainers.unsubscribe();
    }
}
