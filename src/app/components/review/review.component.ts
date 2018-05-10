import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {

  constructor(private router: Router) {
  }

  goToAddContainer(): void {
    this.router.navigate(['/search']);
  }

  exportProject(): void {
    alert('Not implemented yet');
  }

}
