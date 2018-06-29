import { SidebarService } from './services/sidebar.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  public wrapperStatus = 'full';
  private sidebarSubscription: Subscription;
  private routerSubscription: Subscription;

  constructor(private sidebarStatus: SidebarService,
              private changeDetector: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initSidebar();
    this.initGoogleAnalytics();
  }

  private initSidebar(): void {
    this.sidebarSubscription = this.sidebarStatus.getObservable().subscribe((status: boolean) => {
      this.wrapperStatus = status ? 'sidebar' : 'full';
      this.changeDetector.detectChanges();
    });
  }

  private initGoogleAnalytics(): void {
    if (!environment.production || !window.localStorage) {
      return;
    }

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateGoogleAnalyticsPage(event.urlAfterRedirects);
      }
    });
  }

  private updateGoogleAnalyticsPage(url: string): void {
    setTimeout(() => {
      ga('set', 'page', url);
      ga('send', 'pageview');
    }, 250);
  }

  ngOnDestroy(): void {
    this.sidebarSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
