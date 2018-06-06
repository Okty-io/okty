import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message: Notification;
  private subject: Subject<Notification> = new Subject<Notification>();

  makeNotification(content, style): void {
    this.message = new Notification(content, style);
    this.show();
  }

  show(): void {
    this.subject.next(this.message);
  }

  getObservable(): Observable<Notification> {
    return this.subject.asObservable();
  }

}
