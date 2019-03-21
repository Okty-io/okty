import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerFormData } from '../../interfaces/form-data';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-generator-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    containers: ContainerFormData[] = [];

    private containersSubscription;

    constructor(private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.containersSubscription = this.sessionService.containersChange()
            .subscribe((containers: ContainerFormData[]) => this.containers = containers);
    }

    ngOnDestroy(): void {
        this.containersSubscription.unsubscribe();
    }
    deleteContainer(id: string): void {
        this.sessionService.removeContainer(id);
    }
}
