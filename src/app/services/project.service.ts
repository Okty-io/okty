import { Injectable } from '@angular/core';
import { Container } from '../models/container.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {

  private containersSubject: Subject<Array<Container>> = new Subject<Array<Container>>();
  private containers: Container[] = [];

  addContainer(id: string, container: Container): void {
    container.containerId = id;

    const oldContainer = this.getContainer(id);
    if (!oldContainer) {
      this.containers.push(container);
    } else {
      const index = this.containers.indexOf(oldContainer);
      this.containers[index] = container;
    }

    this.containersSubject.next(this.containers);
  }

  getContainer(id: string): Container {
    const container: Container = this.containers.find((element: Container) => {
      if (element.containerId === id) {
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

  getDockerCompose(): any {
    const services = {};
    this.containers.forEach((container: Container) => {
      services[container.containerId] = container.output;
    });

    const config = {
      version: '3',
      services: services
    };

    return YAML.stringify(config, 4);
  }

  getContainers() {
    return this.containers;
  }
}
