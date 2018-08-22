import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Template } from '../models/template.model';
import { IConfigService } from './config/IConfig.service';

@Injectable()
export class NewTemplateResolve implements Resolve<Template> {

  constructor(@Inject('IConfigService') private configService: IConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Template> {
    return new Observable<Template>(observer => {

      this.configService.getTemplate(route.params.id)
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
