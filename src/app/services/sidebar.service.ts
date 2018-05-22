import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SidebarService {

  private visibleSubject: Subject<boolean> = new Subject<boolean>();

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
