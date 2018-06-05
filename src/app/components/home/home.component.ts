import {Component, ElementRef, OnChanges, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {SidebarService} from '../../services/sidebar.service';
import {isBoolean} from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  redirection = false;
  sidebarVisible = false;
  constructor(private router: Router, private elRef: ElementRef, private sidebarService: SidebarService) {
    elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
    elRef.nativeElement.ownerDocument.body.style.width = '100vw';
    elRef.nativeElement.ownerDocument.body.style.height = '100vh';
    elRef.nativeElement.ownerDocument.body.style.display = 'block';
    this.sidebarService.getObservable().subscribe(value => this.sidebarVisible = value);
    console.log(this.sidebarVisible);
  }
  ngOnDestroy() {
    this.elRef.nativeElement.ownerDocument.body.style.overflow = null;
    this.elRef.nativeElement.ownerDocument.body.style.width = null;
    this.elRef.nativeElement.ownerDocument.body.style.height = null;
    this.elRef.nativeElement.ownerDocument.body.style.display = null;
  }
  goToSearch() {
    this.redirection = true;
    setTimeout(() => {
      this.router.navigate(['/search']);
    }, 1100);
  }
}
