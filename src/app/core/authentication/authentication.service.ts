import { Injectable } from '@angular/core';
import User from '../../shared/models/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private user: User;
    private subject: BehaviorSubject<User>;

    constructor(private api: ApiService) {
        this.user = null;
        this.subject = new BehaviorSubject(this.user);
    }

    public login(token: string): void {
        localStorage.setItem('token', token);

        this.api.get('user').subscribe((user) => {
            this.user = new User(user);
            this.subject.next(this.user);
        });
    }

    public logout(): void {
        this.user = null;
        this.subject.next(this.user);
    }

    public getObservable(): Observable<User> {
        return this.subject.asObservable();
    }
}
