import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Template } from '../models/template.model';
import { ApiService } from './api.service';

@Injectable()
export class NewTemplateResolve implements Resolve<Template> {

  constructor(private apiService: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Template> {
    return new Observable<Template>(observer => {

      this.apiService.getTemplate(route.params.id)
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
