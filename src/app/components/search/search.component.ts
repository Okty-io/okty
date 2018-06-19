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
  results: Array<ISearchable[]> = [];

  constructor(private titleService: CustomTitleService,
              private route: ActivatedRoute) {
    this.results = route.snapshot.data.results;
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Search');
  }
}
