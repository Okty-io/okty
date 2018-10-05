import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Container } from '../models/container.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class NewContainerResolve implements Resolve<Container> {

  constructor(private apiService: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Container> {
    return new Observable<Container>(observer => {

      this.apiService.getContainer(route.params.id)
        .then(container => {
          observer.next(container);
          observer.complete();
        })
        .catch(() => {
          observer.complete();
        });
    });
  }

}
