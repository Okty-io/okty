import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Container } from '../models/container.model';
import { Observable } from 'rxjs';
import { ISearchable } from '../models/ISearchable';
import { IConfigService } from './config/IConfig.service';

@Injectable()
export class SearchContainersResolve implements Resolve<ISearchable[]> {

  constructor(@Inject('IConfigService') private configService: IConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISearchable[]> {
    return new Observable<ISearchable[]>(observer => {
      this.configService.getAllContainers().then(containers => {

        containers.forEach((container: Container) => {
          container.action = '/new/' + container.path;
        });

        observer.next(containers);
        observer.complete();
      }).catch(() => {
        observer.complete();
      });
    });
  }

}
