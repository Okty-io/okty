import { ISubscription } from 'rxjs/Subscription';
import { SidebarService } from './services/sidebar.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { wrapperAnimation } from './wrapper.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [wrapperAnimation]
})
export class AppComponent implements OnInit, OnDestroy {

    public wrapperStatus: string = 'full';
    private subscription: ISubscription;

    constructor(private sidebarStatus: SidebarService) {}

    ngOnInit(): void {
        this.subscription = this.sidebarStatus.getObservable().subscribe((status: boolean) => {
            this.wrapperStatus = status ? 'sidebar' : 'full';
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
