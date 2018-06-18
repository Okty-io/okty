import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../../models/template.model';
import { ContainerService } from '../../services/container.service';
import { Container } from '../../models/container.model';
import { ProjectService } from '../../services/project.service';

@Component({
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit {
  private template: Template;

  constructor(private route: ActivatedRoute,
              private containerService: ContainerService,
              private projectService: ProjectService,
              private router: Router) {
    this.template = this.route.snapshot.data.template;
  }

  ngOnInit(): void {
    if (this.projectService.getContainers().length > 0 && this.projectService.isFromTemplate()) {
      this.projectService.reset();

      this.router.navigate(['/template']);
      return;
    }

    this.template.containers.forEach(async (element: Container) => {
      const container = await this.containerService.getContainerConfig(element.configPath);
      container.output = element.output;

      this.projectService.addContainer(element.containerId, container);
    });

    this.projectService.setFromTemplate(true);
    this.router.navigate(['/review']);
  }
}
