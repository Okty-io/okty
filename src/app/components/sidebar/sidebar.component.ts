import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {Container} from '../../models/container.model';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {

  visible = false;
  containers: Array<Container> = [];
  private subscription: ISubscription;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.subscription = this.projectService.getContainers().subscribe(containers => {
      this.containers = containers;

      if (this.containers.length > 0) {
        this.visible = true;
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
