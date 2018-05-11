import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Container} from '../models/container.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EditContainerResolve implements Resolve<Container> {

  resolve(route: ActivatedRouteSnapshot): Observable<Container> {
    return new Observable<Container>(observer => {
      observer.next(null);
      observer.complete();
    });
  }

}
