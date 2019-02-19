import { Injectable } from '@angular/core';
import User from '../../shared/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private user: User;
    private subject: BehaviorSubject<User>;
    private jwtHelper;

    constructor(private api: ApiService) {
        this.user = null;
        this.subject = new BehaviorSubject(this.user);
        this.jwtHelper = new JwtHelperService();
    }

    public checkloggedIn(): void {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        this.login(token);
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

    public hasToken(): boolean {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }

        if (token && this.jwtHelper.isTokenExpired(token)) {
            localStorage.removeItem('token');
            return false;
        }

        return true;
    }
}
