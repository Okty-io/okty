import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerRepository } from '../../repositories/container.repository';
import { Container } from '../../models/container';
import { Listable } from '../../interfaces/listable';

@Component({
    templateUrl: './containers.component.html',
    styleUrls: ['./containers.component.scss']
})
export class ContainersComponent implements OnInit, OnDestroy {

    containers: Container[];
    displayed: Listable[];

    private subscribeContainers;

    constructor(private containerRepository: ContainerRepository) {
    }

    ngOnInit(): void {
        this.containers = null;
        this.displayed = null;

        this.subscribeContainers = this.containerRepository.getAll().subscribe((containers: Container[]) => {
            this.containers = containers;
            this.displayed = containers;
        });
    }

    ngOnDestroy(): void {
        this.subscribeContainers.unsubscribe();
    }

    updateDisplayed(containers: Listable[]) {
        this.displayed = containers;
    }
}
