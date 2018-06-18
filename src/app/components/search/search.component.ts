import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../../services/container.service';
import { CustomTitleService } from '../../services/title.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchContainer: HTMLInputElement;
  containers: Array<any> = [];

  constructor(private containerService: ContainerService, private titleService: CustomTitleService) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Search');
    this.containerService.getAvailableContainers().then(containers => this.containers = containers);
  }
}
