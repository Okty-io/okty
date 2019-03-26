import { Component, OnInit } from '@angular/core';
import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ContainerArgs } from '../../interfaces/api-data';
import { saveAs } from 'file-saver';
import { ContainerFormData } from '../../interfaces/form-data';
import { ProjectRepository } from '../../repositories/project.repository';
import { ContainerService } from '../../services/container.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-generator-review-action',
    templateUrl: './review-action.component.html',
    styleUrls: ['./review-action.component.scss']
})
export class ReviewActionComponent implements OnInit {
    faDownload = faDownload;
    faPlus = faPlus;
    loading: boolean;
    error: boolean;

    containers: Array<ContainerFormData>;

    constructor(
        private projectRepository: ProjectRepository,
        private containerService: ContainerService,
        private sessionService: SessionService
    ) {
    }

    public ngOnInit(): void {
        this.error = false;
        this.loading = false;
        this.containers = this.sessionService.getContainers();
    }

    export(): void {
        this.loading = true;
        const apiArgs: ContainerArgs[] = this.getAllContainersArgs();

        this.projectRepository.build(apiArgs)
            .then((file: Blob) => saveAs(file, 'okty.zip'))
            .catch((error: string) => {
                this.error = true;
                console.error(error);
            })
            .finally(() => this.loading = false);
    }

    private getAllContainersArgs(): ContainerArgs[] {
        const apiArgs: ContainerArgs[] = [];
        this.containers.forEach((data: ContainerFormData) => {
            apiArgs.push(this.containerService.formDataToApiArg(data));
        });

        return apiArgs;
    }
}
