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

    public isEnabled(): boolean {
        return !!environment.gtmId;
    }

    private push(data: any): void {
        if (!(<any>window).dataLayer) {
            (<any>window).dataLayer = [];
        }

        (<any>window).dataLayer.push(data);
    }

    selectProduct(element: { name: string; id: string }): void {
        const data = {
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'products': [{
                        'name': element.name,
                        'id': element.id,
                        'price': 1,
                        'brand': 'Okty',
                        'category': 'Container',
                        'variant': '',
                        'position': 1
                    }]
                }
            }
        };

        this.push(data);
    }

    addToCart(element: { name: string, id: string, variant: string }): void {
        const data = {
            'event': 'addToCart',
            'ecommerce': {
                'currencyCode': 'USD',
                'add': {
                    'products': [{
                        'name': element.name,
                        'id': element.id,
                        'variant': element.variant,
                        'quantity': 1,
                        'price': '1',
                        'brand': 'Okty',
                        'category': 'Container',
                    }]
                }
            }
        };

        this.push(data);
    }

    removeFromCart(element: { name: string, id: string, variant: string }): void {
        const data = {
            'event': 'removeFromCart',
            'ecommerce': {
                'remove': {
                    'products': [{
                        'name': element.name,
                        'id': element.id,
                        'variant': element.variant,
                        'quantity': 1,
                        'price': '1',
                        'brand': 'Okty',
                        'category': 'Container',
                    }]
                }
            }
        };

        this.push(data);
    }

    purchase(elements: Array<{ name: string, id: string, variant: string }>): void {
        const products = elements.map((element) => {
            return {
                'name': element.name,
                'id': element.id,
                'variant': element.variant,
                'quantity': 1,
                'price': '1',
                'brand': 'Okty',
                'category': 'Container',
                'coupon': '',
            };
        });

        const data = {
            'event': 'purchase',
            'ecommerce': {
                'purchase': {
                    'actionField': {
                        'id': (new Date().getTime() + Math.floor((Math.random() * 10000) + 1)).toString(16),
                        'affiliation': '',
                        'revenue': elements.length,
                        'tax': '0',
                        'shipping': '0',
                        'coupon': ''
                    },
                    'products': products
                }
            }
        };

        this.push(data);
    }

    search(text: string): void {

    }
}
