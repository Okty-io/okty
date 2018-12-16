import { Component, OnInit } from '@angular/core';
import { TemplateRepository } from '../../repositories/template.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../../models/template';
import { ContainerFormData, FormFieldData } from '../../interfaces/form-data';
import { ContainerRepository } from '../../repositories/container.repository';
import { Container } from '../../models/container';
import { SessionService } from '../../services/session.service';

@Component({
    templateUrl: './load.component.html',
    styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {

    errors: string[];

    constructor(
        private templateRepository: TemplateRepository,
        private containerRepository: ContainerRepository,
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.errors = [];

        this.templateRepository.getOne(this.activatedRoute.snapshot.params.id).subscribe((template: Template) => {
            template.containers.forEach((container: { image: string, config: Array<FormFieldData[]> }) => {
                this.initContainer(container);
            });

            if (this.errors.length > 0) {
                this.sessionService.reset();
                return;
            }

            setTimeout(() => {
                this.router.navigate(['/', 'generator', 'review']);
            }, 750);
        });
    }

    private async initContainer(container: { image: string, config: Array<FormFieldData[]> }): Promise<void> {
        const data = new ContainerFormData();
        data.image = container.image;
        data.config = container.config;

        data.form = await this.containerRepository.getOne(container.image)
            .toPromise()
            .catch((error) => {
                this.errors.push(error);
                return null;
            }) as Container;

        this.sessionService.addContainer(data);
    }

}
