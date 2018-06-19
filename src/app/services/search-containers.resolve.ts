import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Container } from '../models/container.model';
import { Observable } from 'rxjs';
import { ISearchable } from '../models/ISearchable';
import { GithubService } from './github.service';

@Injectable()
export class SearchContainersResolve implements Resolve<ISearchable[]> {

  constructor(private githubService: GithubService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ISearchable[]> {
    return new Observable<ISearchable[]>(observer => {
      this.githubService.getAllContainers().then(containers => {

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
