import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
