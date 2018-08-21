import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../../models/template.model';
import { Container } from '../../models/container.model';
import { ProjectService } from '../../services/project.service';
import { ContainerService } from '../../services/container.service';
import { IConfigService } from '../../services/config/IConfig.service';

@Component({
    templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit {
    private template: Template;

    constructor(@Inject('IConfigService') private configService: IConfigService,
                private route: ActivatedRoute,
                private projectService: ProjectService,
                private router: Router,
                private containerService: ContainerService) {
        this.template = this.route.snapshot.data.template;
    }

    ngOnInit(): void {
        if (this.projectService.getContainers().length > 0 && this.projectService.isFromTemplate()) {
            this.projectService.reset();
            this.router.navigate(['/template']);
            return;
        }

    const addContainerPromises = [];
    this.template.containers.forEach((element: Container) => {
      addContainerPromises.push(new Promise(async (resolve) => {
        let container: Container = await this.configService.getContainer(element.path);
        container = this.containerService.dataToContainer(container, element.config);

        this.projectService.addContainer(element.containerId, container);
        resolve();
      }));
    });

    Promise.all(addContainerPromises).then(() => {
      this.projectService.setFromTemplate(true);
      this.router.navigate(['/review']);
    });
  }
}
