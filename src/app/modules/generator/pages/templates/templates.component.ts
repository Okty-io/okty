import { Component, OnDestroy, OnInit } from '@angular/core';
import { Template } from '../../models/template';
import { Listable } from '../../interfaces/listable';
import { TemplateRepository } from '../../repositories/template.repository';

@Component({
    templateUrl: './templates.component.html',
    styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, OnDestroy {

    templates: Template[];
    displayed: Listable[];

    private subscribeTemplates;

    constructor(private templateRepository: TemplateRepository) {
    }

    ngOnInit(): void {
        this.templates = null;
        this.displayed = null;

        this.subscribeTemplates = this.templateRepository.getAll().subscribe((templates) => {
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
