import { Component, OnInit } from '@angular/core';
import { ContainerFormData } from '../../interfaces/form-data';
import { SessionService } from '../../services/session.service';
import { ContainerService } from '../../services/container.service';
import { ContainerRepository } from '../../repositories/container.repository';
import { ContainerArgs } from '../../interfaces/api-data';
import { TitleService } from '../../../../core/services/title.service';

@Component({
    selector: 'app-generator-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

    preview: string;

    constructor(
        private sessionService: SessionService,
        private containerService: ContainerService,
        private containerRepository: ContainerRepository,
        private titleService: TitleService,
    ) {

    }

    ngOnInit(): void {
        this.titleService.set('Review and export your project');

        this.preview = '';
        const apiArgs: ContainerArgs[] = this.getAllContainersArgs();

        this.containerRepository.getFullPreview(apiArgs)
            .then((preview: any) => this.preview = preview)
            .catch(() => this.preview = undefined);
    }

    private getAllContainersArgs(): ContainerArgs[] {
        const apiArgs: ContainerArgs[] = [];
        this.sessionService.getContainers().forEach((data: ContainerFormData) => {
            apiArgs.push(this.containerService.formDataToApiArg(data));
        });

        return apiArgs;
    }
}
