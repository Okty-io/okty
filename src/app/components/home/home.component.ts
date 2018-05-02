import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  redirection = false;

  constructor(private router: Router) {
  }

  goToSearch() {
    this.redirection = true;
    setTimeout(() => {
      this.router.navigate(['/search']);
    }, 1100);
  }
}
