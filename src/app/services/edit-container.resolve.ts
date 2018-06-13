import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Container } from '../models/container.model';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs';

@Injectable()
export class EditContainerResolve implements Resolve<Container> {

  constructor(private projectService: ProjectService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Container> {
    return new Observable<Container>(observer => {
      const container = this.projectService.getContainer(route.params.id);
      if (!container) {
        this.router.navigate(['/search']);
        observer.complete();
        return;
      }

      container.containerId = null;
      observer.next(container);
      observer.complete();
    });
  }
}
