import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {

  private visibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  hide(): void {
    this.visibleSubject.next(false);
  }

  show(): void {
    this.visibleSubject.next(true);
  }

  getObservable(): Observable<boolean> {
    return this.visibleSubject.asObservable();
  }
}
