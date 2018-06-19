import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Container } from '../../models/container.model';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {

  visible = false;
  containers: Array<Container> = [];
  private sidebarSubscription: Subscription;
  private containersSubscription: Subscription;

  constructor(private projectService: ProjectService, private sidebareService: SidebarService) {
  }

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebareService.getObservable().subscribe(visible => {
      this.visible = visible;
    });

    this.containersSubscription = this.projectService.getContainersObservable().subscribe(containers => {
      this.containers = containers;
    });
  }

  ngOnDestroy(): void {
    this.sidebarSubscription.unsubscribe();
    this.containersSubscription.unsubscribe();
  }
}
