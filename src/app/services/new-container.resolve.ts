import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Container } from '../models/container.model';
import { Observable } from 'rxjs';
import { GithubService } from './github.service';

@Injectable()
export class NewContainerResolve implements Resolve<Container> {

  constructor(private githubService: GithubService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Container> {
    return new Observable<Container>(observer => {

      this.githubService.getContainer(route.params.id)
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
