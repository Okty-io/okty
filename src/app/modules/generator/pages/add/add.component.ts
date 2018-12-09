import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Container } from '../../../../core/models/container';
import { FormGroup } from '@angular/forms';
import { SessionService } from '../../../../core/services/session.service';
import { ContainerRepository } from '../../../../core/repositories/container.repository';

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
        private containerRepository: ContainerRepository,
        private sessionService: SessionService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.subscribeContainer = this.containerRepository.getOne(this.route.snapshot.params.id)
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
        this.router.navigate(['/', 'generator', 'review']);
    }
}
