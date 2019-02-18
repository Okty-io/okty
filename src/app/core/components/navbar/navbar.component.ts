import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import User from '../../../shared/models/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

    public user: User;
    private subscription: Subscription;

    constructor(private authentication: AuthenticationService) {
    }

    public ngOnInit(): void {
        this.subscription = this.authentication.getObservable().subscribe((user) => this.user = user);
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
