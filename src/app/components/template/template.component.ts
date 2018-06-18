import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../../models/template.model';
import { Container } from '../../models/container.model';
import { ProjectService } from '../../services/project.service';
import { GithubService } from '../../services/github.service';
import { ContainerService } from '../../services/container.service';

@Component({
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit {
  private template: Template;

  constructor(private route: ActivatedRoute,
              private githubService: GithubService,
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

    this.template.containers.forEach(async (element: Container) => {
      let container: Container = await this.githubService.getContainer(element.configPath);
      container = this.containerService.dataToContainer(container, element.config);

      this.projectService.addContainer(element.containerId, container);
    });

    this.projectService.setFromTemplate(true);
    this.router.navigate(['/review']);
  }
}
