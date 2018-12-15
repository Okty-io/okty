import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerFormData } from '../../interfaces/form-data';
import { Container } from '../../models/container';
import { FormGroup } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { ContainerService } from '../../services/container.service';
import { ContainerRepository } from '../../repositories/container.repository';
import { FormService } from '../../services/form.service';
import { Location } from '@angular/common';

@Component({
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

    containerFormData: ContainerFormData;

    container: Container;
    data: FormGroup;

    preview: string;
    error: string;

    constructor(
        private route: ActivatedRoute,
        private sessionService: SessionService,
        private containerService: ContainerService,
        private containerRepository: ContainerRepository,
        private formService: FormService,
        private router: Router,
        private location: Location) {
    }

    ngOnInit() {
        this.containerFormData = this.sessionService.getContainer(this.route.snapshot.params.id);
        if (!this.containerFormData) {
            throw new Error('Container not found');
        }

        this.preview = '';
        this.container = this.containerFormData.form;
    }

    updateData(updatedData: FormGroup) {
        this.data = updatedData;

        const containerData = this.formService.formToContainerData(this.data, this.container, this.route.snapshot.params.id);
        const apiArg = this.containerService.formDataToApiArg(containerData);
        this.containerRepository.getPreview(apiArg)
            .then((preview: any) => this.preview = preview)
            .catch((error) => console.log(error));
    }

    submit(): void {
        if (this.data.invalid) {
            return;
        }

        const containerFormData = this.formService.formToContainerData(this.data, this.container, this.containerFormData.image);
        containerFormData.id = this.containerFormData.id;

        this.sessionService.addContainer(containerFormData);
        this.router.navigate(['/', 'generator', 'review']);
    }

    delete(): void {
        this.sessionService.removeContainer(this.containerFormData.id);
        this.router.navigate(['/', 'generator', 'review']);
    }

    goBack(): void {
        this.location.back();
    }
}
