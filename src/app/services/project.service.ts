import { Injectable } from '@angular/core';
import { Container } from '../models/container.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProjectService {

  private containersSubject: Subject<Array<Container>> = new Subject<Array<Container>>();
  private containers: Container[] = [];

  addContainer(id: string, container: Container): boolean {
    const isNew = container.containerId === undefined;

    const oldContainer = this.getContainer(id);
    if (oldContainer && isNew) {
      alert('This container ID is already used');
      return false;
    }

    container.containerId = id;
    if (!oldContainer) {
      this.containers.push(container);
    } else {
      const index = this.containers.indexOf(oldContainer);
      this.containers[index] = container;
    }

    this.containersSubject.next(this.containers);
    return true;
  }

  getContainer(id: string): Container {
    const container: Container = this.containers.find((element: Container) => {
      return element.containerId === id;
    });

    if (!container) {
      return null;
    }

    return container;
  }

  removeContainer(id: string): void {
    const index: number = this.containers.findIndex((element: Container) => {
      return element.containerId === id;
    });

    this.containers.splice(index, 1);
    this.containersSubject.next(this.containers);
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
