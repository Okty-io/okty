import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy  {

  message: any;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.message = this.messageService.getObservable().subscribe(
      notification =>  {
        this.message = notification;
        setTimeout(() => {
          this.message = '';
        }, 2000);
      }
    );
  }

  ngOnDestroy(): void {
    this.message.unsubscribe();
  }

}
