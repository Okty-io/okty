import {Component, ElementRef, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{

  redirection = false;

  constructor(private router: Router, private elRef: ElementRef) {
    elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
  }
  ngOnDestroy() {
    this.elRef.nativeElement.ownerDocument.body.style.overflow = null;
  }
  goToSearch() {
    this.redirection = true;
    setTimeout(() => {
      this.router.navigate(['/search']);
    }, 1100);
  }
}
