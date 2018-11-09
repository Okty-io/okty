import { Injectable } from '@angular/core';
import { Container } from '../models/container.model';
import { Observable, Subject } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Injectable()
export class ProjectService {

  private containersSubject: Subject<Array<Container>>;

  private fromTemplate: boolean;
  private containers: Container[];

  constructor(private sidebarService: SidebarService) {
    this.containersSubject = new Subject<Array<Container>>();
    this.containers = [];
    this.fromTemplate = false;
  }

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

    this.sidebarService.show();
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

  getContainerByIndex(index: number): Container {
    const container: Container = this.containers[index];
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

  getContainers() {
    return this.containers;
  }

  getIndexOfContainer(container: Container) {
    return this.containers.findIndex((element: Container) => {
      return element.containerId === container.containerId;
    });
  }

  setFromTemplate(isFromTemplate: boolean) {
    this.fromTemplate = isFromTemplate;
  }

  isFromTemplate(): boolean {
    return this.fromTemplate;
  }

  reset() {
    this.containers = [];
    this.sidebarService.hide();
    this.containersSubject.next(this.containers);
  }

  getBuildArgs() {
    const args = [];

    this.containers.forEach((data: Container) => {
      args.push(data.output);
    });

    return args;
  }
}
