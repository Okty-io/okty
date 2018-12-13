import { Component, OnInit } from '@angular/core';
import { ContainerFormData } from '../../interfaces/form-data';
import { SessionService } from '../../services/session.service';
import { ContainerService } from '../../services/container.service';
import { ContainerRepository } from '../../repositories/container.repository';
import { ContainerArgs } from '../../interfaces/api-data';

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
