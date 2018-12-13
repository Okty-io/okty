import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Container } from '../../models/container';
import { ContainerRepository } from '../../repositories/container.repository';
import { SessionService } from '../../services/session.service';
import { ContainerService } from '../../services/container.service';
import { ContainerFormData } from '../../interfaces/form-data';

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
        containerFormData.form = this.route.snapshot.params.id;
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

        const apiArg = await this.containerService.formDataToApiArg(this.getContainerFormData());
        this.containerRepository.getPreview(apiArg)
            .then((preview: any) => this.preview = preview)
            .catch((error) => console.log(error));
    }
}
