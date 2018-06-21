import { SidebarService } from './services/sidebar.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

    public wrapperStatus = 'full';
    private subscription: Subscription;

    constructor(private sidebarStatus: SidebarService, private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.subscription = this.sidebarStatus.getObservable().subscribe((status: boolean) => {
            this.wrapperStatus = status ? 'sidebar' : 'full';
            this.changeDetector.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
