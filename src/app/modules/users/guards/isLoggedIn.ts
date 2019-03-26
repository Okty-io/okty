import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication/authentication.service';

@Injectable()
export class IsLoggedIn implements CanActivate {

    constructor(private authentication: AuthenticationService, private router: Router) {
    }

    canActivate(): boolean {
        if (this.authentication.hasToken()) {
            return true;
        }

        this.router.navigate(['/', 'users', 'login']);
        return false;
    }
}
