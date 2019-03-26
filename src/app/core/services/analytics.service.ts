import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { environment } from '../../../environments/environment';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TitleService } from './title.service';

@Injectable({
    providedIn: CoreModule
})
export class AnalyticsService {

    constructor(private router: Router, private titleService: TitleService) {
    }

    public init(): void {
        if (!this.isEnabled()) {
            return;
        }

        gtag('config', environment.GoogleAnalyticsId);

        this.initRouterEvent();
    }

    // noinspection JSMethodCanBeStatic
    public isEnabled(): boolean {
        return environment.GoogleAnalyticsId && typeof gtag !== undefined;
    }

    private initRouterEvent(): void {
        this.router.events.subscribe((event: RouterEvent) => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            gtag('config', environment.GoogleAnalyticsId, {
                'page_path': event.url,
                'page_title': this.titleService.get(),
            });
        });
    }
}
