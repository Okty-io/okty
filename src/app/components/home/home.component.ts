import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { CustomTitleService } from '../../services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  redirection = false;
  sidebarVisible = false;

  searchSelected = false;
  templateSelected = false;

  constructor(
    private router: Router,
    private elRef: ElementRef,
    private sidebarService: SidebarService,
    private titleService: CustomTitleService
  ) {
    elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
    elRef.nativeElement.ownerDocument.body.style.width = '100vw';
    elRef.nativeElement.ownerDocument.body.style.height = '100vh';
    elRef.nativeElement.ownerDocument.body.style.display = 'block';
    this.sidebarService.getObservable().subscribe(value => this.sidebarVisible = value);
  }

  ngOnInit(): void {
    this.titleService.resetTitle();
  }

  ngOnDestroy() {
    this.elRef.nativeElement.ownerDocument.body.style.overflow = null;
    this.elRef.nativeElement.ownerDocument.body.style.width = null;
    this.elRef.nativeElement.ownerDocument.body.style.height = null;
    this.elRef.nativeElement.ownerDocument.body.style.display = null;
  }

  goToSearch() {
    this.redirection = true;
    this.searchSelected = true;
    setTimeout(() => {
      this.router.navigate(['/search']);
    }, 1100);
  }

  goToTemplate(): void {
    this.redirection = true;
    this.templateSelected = true;
    setTimeout(() => {
      this.router.navigate(['/template']);
    }, 1100);
  }
}
