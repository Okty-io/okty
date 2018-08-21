import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ISearchable } from '../models/ISearchable';
import { Template } from '../models/template.model';
import { IConfigService } from './config/IConfig.service';

@Injectable()
export class SearchTemplatesResolve implements Resolve<ISearchable[]> {

  constructor(@Inject('IConfigService') private configService: IConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISearchable[]> {
    return new Observable<ISearchable[]>(observer => {
      this.configService.getAllTemplates().then(templates => {

        templates.forEach((template: Template) => {
          template.action = '/template/' + template.configPath;
        });

        observer.next(templates);
        observer.complete();
      }).catch(() => {
        observer.complete();
      });
    });
  }

}
