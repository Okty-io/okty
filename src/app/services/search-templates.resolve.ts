import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ISearchable } from '../models/ISearchable';
import { Template } from '../models/template.model';
import { ApiService } from './api.service';

@Injectable()
export class SearchTemplatesResolve implements Resolve<ISearchable[]> {

  constructor(private apiService: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISearchable[]> {
    return new Observable<ISearchable[]>(observer => {
      this.apiService.getAllTemplates().then(templates => {
        templates.forEach((template: Template) => {
          template.action = '/template/' + template.id;
        });

        observer.next(templates);
        observer.complete();
      }).catch(() => {
        observer.complete();
      });
    });
  }

}
