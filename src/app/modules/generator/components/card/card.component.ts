import { Component, Input } from '@angular/core';
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

    constructor(private analytics: AnalyticsService) {
    }

    public onClick(element: Container | Template) {
        this.analytics.selectProduct({id: element.id, name: element.name});
    }
}
