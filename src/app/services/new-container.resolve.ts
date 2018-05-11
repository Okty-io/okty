import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Container} from '../models/container.model';
import {ContainerService} from './container.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NewContainerResolve implements Resolve<Container> {

  constructor(private containerService: ContainerService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Container> {
    return new Observable<Container>(observer => {

      this.containerService.getContainerConfig(route.params.id)
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
