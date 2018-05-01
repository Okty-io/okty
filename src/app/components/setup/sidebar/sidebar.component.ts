import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {Container} from '../../../models/container.model';

@Component({
  selector: 'app-setup-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  containers: Array<Container> = [];

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.containers = this.projectService.getContainers();
  }
}
