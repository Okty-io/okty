import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TemplateService } from './template.service';
import { Template } from '../models/template.model';

@Injectable()
export class NewTemplateResolve implements Resolve<Template> {

  constructor(private templateService: TemplateService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Template> {
    return new Observable<Template>(observer => {

      this.templateService.getTemplateConfig(route.params.id)
        .then(template => {
          observer.next(template);
          observer.complete();
        })
        .catch(() => {
          observer.complete();
        });
    });
  }
}
