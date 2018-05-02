import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Container} from '../models/container.model';
import {ContainerService} from './container.service';

@Injectable()
export class ContainerResolve implements Resolve<Container> {

  constructor(private containerService: ContainerService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Container> {
    return new Promise<Container>(resolve => {

      this.containerService.getContainerConfig(route.params.id)
        .then(container => {
          resolve(container);
        })
        .catch(() => {
          alert('Error : cannot get container configuration');

          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/']);
          resolve(null);
        });
    });
  }

}
