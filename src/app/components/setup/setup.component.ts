import {Component} from '@angular/core';
import {Container} from '../../models/container.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {

  container: Container;

  constructor(private route: ActivatedRoute) {
    this.container = route.snapshot.data.container;
  }

}
