import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';

@Component({
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {

  constructor(private router: Router, private projectService: ProjectService) {
  }

  goToAddContainer(): void {
    this.router.navigate(['/search']);
  }

  exportProject(): void {
    alert('Look in the console');
    console.log(this.projectService.getContainers());
  }

}
