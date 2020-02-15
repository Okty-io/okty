import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AnalyticsService } from '../../../../core/services/analytics.service';
import { Container } from '../../models/container';
import { Template } from '../../models/template';

@Component({
    selector: 'app-generator-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @Input() element: Container | Template;
    private isResourceSvgUrl = new RegExp(/^data:image\/(svg\+xml);base64,([a-zA-Z0-9]|\+)*/);

    constructor(private analytics: AnalyticsService, private sanitizer: DomSanitizer) {
    }

    public getImageSrc(src: string) {
        if (this.isResourceSvgUrl.test(src)) {
           return this.sanitizer.bypassSecurityTrustResourceUrl(src);
        }
        return src;
    }
    public onClick(element: Container | Template) {
        this.analytics.selectProduct({id: element.id, name: element.name});
    }
}
