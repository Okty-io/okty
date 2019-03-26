import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Container } from '../../models/container';
import { ContainerRepository } from '../../repositories/container.repository';
import { SessionService } from '../../services/session.service';
import { ContainerService } from '../../services/container.service';
import { FormService } from '../../services/form.service';
import { TitleService } from '../../../../core/services/title.service';

@Component({
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

    private subscribeContainer;

    container: Container;
    data: FormGroup;
    preview: string;
    error: boolean;
    loading: boolean;

    constructor(
        private containerRepository: ContainerRepository,
        private sessionService: SessionService,
        private route: ActivatedRoute,
        private router: Router,
        private containerService: ContainerService,
        private formService: FormService,
        private titleService: TitleService
    ) {
    }

    ngOnInit(): void {
        this.titleService.set('New container');
        this.preview = '';
        this.loading = true;

        this.subscribeContainer = this.containerRepository.getOne(this.route.snapshot.params.id)
            .subscribe(
                (container: Container) => {
                    this.container = container;
                    this.titleService.set(`New ${this.container.name} container`);
                    this.loading = false;
                },
                () => this.error = true
            );
    }

    ngOnDestroy(): void {
        this.subscribeContainer.unsubscribe();
    }

    submit(): void {
        if (this.data.invalid) {
            return;
        }

        const containerFormData = this.formService.formToContainerData(this.data, this.container);

        this.sessionService.addContainer(containerFormData);
        this.router.navigate(['/', 'generator', 'review']);
    }

    updateData(updatedData: FormGroup) {
        this.data = updatedData;
        this.preview = '';

        const containerData = this.formService.formToContainerData(this.data, this.container);
        const apiArg = this.containerService.formDataToApiArg(containerData);

        this.containerRepository.getPreview(apiArg)
            .then((preview: any) => this.preview = preview)
            .catch(() => this.preview = undefined);
    }
}
