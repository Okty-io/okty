import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  message: any;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.message = this.messageService.message;
    console.log('From NotificationComponent: ' + this.message);
  }


}
