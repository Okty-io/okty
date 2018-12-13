import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../core/services/session.service';
import { ContainerFormData } from '../../../../core/interfaces/form-data';
import { ContainerService } from '../../../../core/services/container.service';
import { ContainerRepository } from '../../../../core/repositories/container.repository';
import { ContainerArgs } from '../../../../core/interfaces/api-data';

@Component({
    selector: 'app-generator-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

    containers: Array<ContainerFormData>;
    preview: string;

    constructor(
        private sessionService: SessionService,
        private containerService: ContainerService,
        private containerRepository: ContainerRepository) {

    }

    ngOnInit(): void {
        this.preview = '';
        this.containers = this.sessionService.getContainers();

        const promises: Promise<ContainerArgs>[] = [];
        this.containers.forEach((data: ContainerFormData) => {
            promises.push(this.containerService.formDataToApiArg(data));
        });

        Promise.all(promises).then((apiArgs: ContainerArgs[]) => {
            this.containerRepository.getFullPreview(apiArgs)
                .then((preview: any) => this.preview = preview)
                .catch((error) => console.log(error));
        });
    }

}
