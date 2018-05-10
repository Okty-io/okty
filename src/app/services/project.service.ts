import {Injectable} from '@angular/core';
import {Container} from '../models/container.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProjectService {

  private containersSubject: Subject<Array<Container>> = new Subject<Array<Container>>();
  private containers: Array<Container> = [];
  private config: Array<any> = [];

  addContainer(container, config): void {
    this.containers.push(container);
    this.containersSubject.next(this.containers);

    const id = this.containers.length;
    this.config['container_' + id] = config;

    console.log(this.config);
  }

  getConfig(id: number) {
    return this.config['container_' + id.toString()];
  }

  getContainers(): Observable<Array<Container>> {
    return this.containersSubject.asObservable();
  }
}
