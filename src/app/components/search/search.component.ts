import {Component, OnInit} from '@angular/core';
import {ContainerService} from '../../services/container.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  containers: Array<any> = [];

  constructor(private containerService: ContainerService) {
  }

  public ngOnInit(): void {
    //this.containerService.getAvailableContainers().then(containers => this.containers = containers);
  }
}
