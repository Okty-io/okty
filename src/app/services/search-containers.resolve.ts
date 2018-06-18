import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Container } from '../models/container.model';
import { ContainerService } from './container.service';
import { Observable } from 'rxjs';
import { ISearchable } from '../models/ISearchable';

@Injectable()
export class SearchContainersResolve implements Resolve<ISearchable[]> {

  constructor(private containerService: ContainerService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISearchable[]> {
    return new Observable<ISearchable[]>(observer => {
      this.containerService.getAvailableContainers().then(containers => {

        containers.forEach((container: Container) => {
          container.action = '/new/' + container.configPath;
        });

        observer.next(containers);
        observer.complete();
      }).catch(() => {
        observer.complete();
      });
    });
  }

}
