import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../../models/template.model';
import { Container } from '../../models/container.model';
import { ProjectService } from '../../services/project.service';
import { ContainerService } from '../../services/container.service';
import { ApiService } from '../../services/api.service';

@Component({
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit {
  private template: Template;

  constructor(private apiService: ApiService,
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
    this.template.containers.forEach((element: any) => {
      addContainerPromises.push(new Promise(async (resolve) => {
        let container: Container = await this.apiService.getContainer(element.image);

        if (!element.config) {
          resolve();
          return;
        }

        const config = {};
        for (const key in element.config) {
          if (!element.config.hasOwnProperty(key)) {
            continue;
          }

          config[key] = element.config[key];
        }

        container = this.containerService.dataToContainer(container, config);

        this.projectService.addContainer(container.containerId, container);
        resolve();
      }));
    });

    Promise.all(addContainerPromises).then(() => {
      this.projectService.setFromTemplate(true);
      this.router.navigate(['/review']);
    });
  }
}
