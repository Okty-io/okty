import { CanDeactivate } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LeaveGuard implements CanDeactivate<any> {

    constructor(private session: SessionService) {
    }

    canDeactivate(): boolean {
        const exit = confirm('You are leaving our generator. The current project won\'t be saved.');
        if (exit) {
            this.session.reset();
        }

        return exit;
    }

}
