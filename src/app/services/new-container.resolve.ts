import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Container } from '../models/container.model';
import { Observable } from 'rxjs';
import { IConfigService } from './config/IConfig.service';

@Injectable()
export class NewContainerResolve implements Resolve<Container> {

  constructor(@Inject('IConfigService') private configService: IConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Container> {
    return new Observable<Container>(observer => {

      this.configService.getContainer(route.params.id)
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
