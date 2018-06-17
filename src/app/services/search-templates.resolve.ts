import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TemplateService } from './template.service';
import { ISearchable } from '../models/ISearchable';
import { Template } from '../models/template.model';

@Injectable()
export class SearchTemplatesResolve implements Resolve<ISearchable[]> {

  constructor(private templateService: TemplateService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISearchable[]> {
    return new Observable<ISearchable[]>(observer => {
      this.templateService.getAvailableTemplates().then(templates => {

        templates.forEach((template: Template) => {
          template.action = '';
        });

        observer.next(templates);
        observer.complete();
      }).catch(() => {
        observer.complete();
      });
    });
  }

}
