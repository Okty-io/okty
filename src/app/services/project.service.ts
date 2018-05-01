import {Injectable} from '@angular/core';
import {Container} from '../models/container.model';

@Injectable()
export class ProjectService {

  private containers: Array<Container> = [];

  addContainer(): void {
    this.containers.push(new Container());
  }

  getContainers(): Array<Container> {
    return this.containers;
  }
}
