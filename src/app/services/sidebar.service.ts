import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
