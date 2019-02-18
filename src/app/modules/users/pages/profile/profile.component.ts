import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../../core/authentication/authentication.service';
import User from '../../../../shared/models/user';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    public user: User;
    private subscription: Subscription;

    constructor(private authentication: AuthenticationService) {
    }

    public ngOnInit(): void {
        this.subscription = this.authentication.getObservable().subscribe((user: User) => this.user = user);
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
