import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Container } from '../../../../core/models/container';
import { FormGroup } from '@angular/forms';
import { SessionService } from '../../../../core/services/session.service';
import { ContainerRepository } from '../../../../core/repositories/container.repository';
import { ContainerFormData } from '../../../../core/interfaces/form-data';
import { ContainerService } from '../../../../core/services/container.service';

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
        private router: Router,
        private containerService: ContainerService
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
        const containerFormData = new ContainerFormData();
        containerFormData.image = this.route.snapshot.params.id;
        containerFormData.config = this.data.value;

        console.log(this.containerService.formDataToApiArg(this.container, containerFormData));

        this.sessionService.addContainer(containerFormData);
        // this.router.navigate(['/', 'generator', 'review']);
    }
}
