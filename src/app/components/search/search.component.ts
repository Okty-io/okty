import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '../../services/title.service';
import { ActivatedRoute } from '@angular/router';
import { ISearchable } from '../../models/ISearchable';

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
