import { CanDeactivate } from '@angular/router';

export class LeaveGuard implements CanDeactivate<any> {

    canDeactivate(): boolean {
        return confirm('You are leaving our generator. The current project won\'t be save.');
    }

}
