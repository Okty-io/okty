import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerService } from '../../../../core/services/container.service';
import { ActivatedRoute } from '@angular/router';
import { Container } from '../../../../core/models/container';
import { FormGroup } from '@angular/forms';
import { SessionService } from '../../../../core/services/session.service';

@Component({
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

    private subscribeContainer;

    container: Container;
    data: FormGroup;
    error: string;

    constructor(
        private containerService: ContainerService,
        private sessionService: SessionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.subscribeContainer = this.containerService.getOne(this.route.snapshot.params.id)
            .subscribe(
                (container: Container) => this.container = container,
                (error: string) => this.error = error
            );
    }

    ngOnDestroy(): void {
        this.subscribeContainer.unsubscribe();
    }

    submit(): void {
        this.sessionService.addContainer(this.data.value);
    }
}
