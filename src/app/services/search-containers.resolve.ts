import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Container } from '../models/container.model';
import { Observable } from 'rxjs';
import { ISearchable } from '../models/ISearchable';
import { ApiService } from './api.service';

@Injectable()
export class SearchContainersResolve implements Resolve<ISearchable[]> {

  constructor(private apiService: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISearchable[]> {
    return new Observable<ISearchable[]>(observer => {
      this.apiService.getAllContainers().then(containers => {
        containers.forEach((container: Container) => {
          container.action = '/new/' + container.id;
        });

        observer.next(containers);
        observer.complete();
      }).catch(() => {
        observer.complete();
      });
    });
  }

}
