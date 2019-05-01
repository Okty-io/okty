import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: CoreModule
})
export class AnalyticsService {
    public init(): void {
        if (!this.isEnabled()) {
            return;
        }

        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            });
            const f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l !== 'dataLayer' ? '&l=' + l : '';
            (<any>j).async = true;
            (<any>j).src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', environment.gtmId);
    }

    // noinspection JSMethodCanBeStatic
    public isEnabled(): boolean {
        return !!environment.gtmId;
    }
}
