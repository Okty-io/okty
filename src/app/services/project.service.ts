import {Injectable} from '@angular/core';
import {Container} from '../models/container.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProjectService {

  private containersSubject = new Subject<Array<Container>>();
  private containers: Array<Container> = [];

  addContainer(): void {
    this.containers.push(new Container());
    this.containersSubject.next(this.containers);
  }

  getContainers(): Observable<Array<Container>> {
    return this.containersSubject.asObservable();
  }
}
