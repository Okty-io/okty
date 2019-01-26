import { Component, OnInit } from '@angular/core';
import { ContainerFormData } from '../../interfaces/form-data';
import { SessionService } from '../../services/session.service';
import { ContainerService } from '../../services/container.service';
import { ContainerRepository } from '../../repositories/container.repository';
import { ContainerArgs } from '../../interfaces/api-data';
import { TitleService } from '../../../../core/services/title.service';
import { ProjectRepository } from '../../repositories/project.repository';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-generator-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

    containers: Array<ContainerFormData>;
    preview: string;

    loading: boolean;

    constructor(
        private sessionService: SessionService,
        private containerService: ContainerService,
        private containerRepository: ContainerRepository,
        private titleService: TitleService,
        private projectRepository: ProjectRepository
    ) {

    }

    ngOnInit(): void {
        this.titleService.set('Review and export your project');

        this.loading = false;
        this.preview = '';
        this.containers = this.sessionService.getContainers();

        const apiArgs: ContainerArgs[] = this.getAllContainersArgs();

        this.containerRepository.getFullPreview(apiArgs)
            .then((preview: any) => this.preview = preview)
            .catch(() => this.preview = undefined);
    }

    export(): void {
        this.loading = true;
        const apiArgs: ContainerArgs[] = this.getAllContainersArgs();

        this.projectRepository.build(apiArgs)
            .then((file: Blob) => saveAs(file, 'okty.zip'))
            .catch((error: string) => console.error(error))
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
