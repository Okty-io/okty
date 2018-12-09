import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerService } from '../../../../core/services/container.service';
import Container from '../../../../core/models/container';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

    private subscribeContainer;

    container: Container;

    constructor(private containerService: ContainerService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscribeContainer = this.containerService.getOne(this.route.snapshot.params.id)
            .subscribe((container: Container) => this.container = container);
    }

    ngOnDestroy() {
        this.subscribeContainer.unsubscribe();
    }
}
