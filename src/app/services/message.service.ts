import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class Message {
  content: string;
  style: string;

  constructor(content, style?) {
    this.content = content;
    this.style = style || 'info';
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message: Message;
  private subject: Subject<Message> = new Subject<Message>();

  makeNotification(content, style): void {
    this.message = new Message(content, style);
    this.show();
  }

  show(): void {
    this.subject.next(this.message);
  }

  getObservable(): Observable<Message> {
    return this.subject.asObservable();
  }

}
