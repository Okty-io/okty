import { Injectable } from '@angular/core';

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

  message: Message;

  makeNotification(content, style): void {
    this.message =  new Message(content, style);
    console.log('From MessageService: ' + this.message);
  }

}
