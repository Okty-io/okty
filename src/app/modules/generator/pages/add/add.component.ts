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
    preview: string;
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

    getContainerFormData(): ContainerFormData {
        const containerFormData = new ContainerFormData();
        containerFormData.image = this.route.snapshot.params.id;
        containerFormData.config = this.data.value;

        return containerFormData;
    }

    submit(): void {
        const containerFormData = this.getContainerFormData();

        this.sessionService.addContainer(containerFormData);
        this.router.navigate(['/', 'generator', 'review']);
    }

    async updateData(updatedData: FormGroup) {
        this.data = updatedData;

        const apiArg = this.containerService.formDataToApiArg(this.container, this.getContainerFormData());
        this.containerRepository.getPreview(apiArg)
            .then((preview: any) => this.preview = preview)
            .catch((error) => console.log(error));
    }
}
