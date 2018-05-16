import { Injectable } from '@angular/core';
import { Container } from '../models/container.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {

  private containersSubject: Subject<Array<Container>> = new Subject<Array<Container>>();
  private containers: Array<Container> = [];

  addContainer(container): void {
    if (!container.containerId) {
      container.containerId = this.containers.length + 1;
      this.containers.push(container);
    } else {
      this.containers[container.containerId - 1] = container;
    }

    this.containersSubject.next(this.containers);
  }

  getContainer(id: string): Container {
    const container: Container = this.containers.find((element: Container) => {
      if (element.containerId === parseInt(id, 10)) {
        return true;
      }
    });

    if (!container) {
      return null;
    }

    return container;
  }

  getContainersObservable(): Observable<Array<Container>> {
    return this.containersSubject.asObservable();
  }

  getContainers(): Array<Container> {
    return this.containers;
  }

  getDockerCompose(): any {
    const services = [];
    this.containers.forEach((container: Container) => {
      services.push(container.output);
    });

    const config = {
      version: '3',
      services: services
    };

    return YAML.stringify(config);
  }
}
