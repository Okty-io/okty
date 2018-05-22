import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SidebarService {

  private visibleSubject: Subject<boolean> = new Subject<boolean>();
  private sideBarStatus: boolean = false;

  hide(): void {
    this.visibleSubject.next(false);
    this.sideBarStatus = false;
  }

  show(): void {
    this.visibleSubject.next(true);
    this.sideBarStatus = true;
  }

  getObservable(): Observable<boolean> {
    return this.visibleSubject.asObservable();
  }
}
