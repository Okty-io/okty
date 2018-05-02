import {Component, OnInit} from '@angular/core';
import {Container} from '../../models/container.model';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project.service';

@Component({
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {

  container: Container;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
    this.container = route.snapshot.data.container;
    console.log(this.container);
  }

  ngOnInit(): void {
    this.projectService.addContainer();
  }

}
