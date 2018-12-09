import { Component, OnDestroy, OnInit } from '@angular/core';
import { TemplateService } from '../../../../core/services/template.service';
import { Template } from '../../../../core/models/template';
import { Listable } from '../../../../core/interfaces/listable';

@Component({
    templateUrl: './templates.component.html',
    styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, OnDestroy {

    templates: Template[];
    displayed: Listable[];

    private subscribeTemplates;

    constructor(private templateService: TemplateService) {
    }

    ngOnInit(): void {
        this.templates = null;
        this.displayed = null;

        this.subscribeTemplates = this.templateService.getAll().subscribe((templates) => {
            this.templates = templates;
            this.displayed = templates;
        });
    }

    ngOnDestroy(): void {
        this.subscribeTemplates.unsubscribe();
    }

    updateDisplayed(templates: Listable[]): void {
        this.displayed = templates;
    }
}
