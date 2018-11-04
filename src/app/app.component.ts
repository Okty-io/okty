import { SidebarService } from './services/sidebar.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
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

  public version = environment.version;

  loading = false;

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
    this.routerSubscription = this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);

      if (event instanceof NavigationEnd) {
        if (!environment.production || !window.localStorage) {
          return;
        }

        this.updateGoogleAnalyticsPage(event.urlAfterRedirects);
      }
    });
  }

  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
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
