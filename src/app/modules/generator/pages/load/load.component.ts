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
        this.sessionService.reset();

        this.templateRepository.getOne(this.activatedRoute.snapshot.params.id).subscribe((template: Template) => {
            const promises = [];

            template.containers.forEach((container: { image: string, config: Array<FormFieldData[]> }) => {
                promises.push(this.initContainer(container));
            });

            Promise.all(promises).then(() => {
                this.router.navigate(['/', 'generator', 'review']);
            }).catch(() => {
                this.sessionService.reset();
            });
        });
    }

    private initContainer(container: { image: string, config: Array<FormFieldData[]> }): Promise<void> {
        return new Promise((resolve, reject) => {
            const data = new ContainerFormData();
            data.image = container.image;
            data.config = container.config;

            this.containerRepository.getOne(container.image).toPromise<Container>()
                .then((form: Container) => {
                    data.form = form;
                    this.sessionService.addContainer(data);

                    resolve();
                })
                .catch((error) => {
                    this.errors.push(error);

                    reject();
                });
        });
    }

}
