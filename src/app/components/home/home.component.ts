import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { CustomTitleService } from '../../services/title.service';
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    redirection = false;
    sidebarVisible = false;

    constructor(
        private router: Router,
        private sidebarService: SidebarService,
        private titleService: CustomTitleService,
        private projectService: ProjectService,
    ) {
        this.sidebarService.getObservable().subscribe(value => this.sidebarVisible = value);
    }

    ngOnInit(): void {
        this.titleService.resetTitle();
        this.sidebarService.hide();
    }

    ngOnDestroy(): void {
        if (this.projectService.getContainers().length) {
            this.sidebarService.show();
        }
    }

    goToSearch() {
        this.redirection = true;
        setTimeout(() => {
            this.router.navigate(['/search']);
        }, 1150);
    }

    goToTemplate(): void {
        this.redirection = true;
        setTimeout(() => {
            this.router.navigate(['/template']);
        }, 1150);
    }
}
