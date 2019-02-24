import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class ApiService {

    private jwtHelper: JwtHelperService;
    private readonly baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.api.host;
        this.jwtHelper = new JwtHelperService();
    }

    private getHeaders(): HttpHeaders {
        let token = localStorage.getItem('token');
        if (this.jwtHelper.isTokenExpired(token)) {
            localStorage.removeItem('token');
            token = null;
        }

        if (!token) {
            return new HttpHeaders();
        }

        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    public get(endpoint: string): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/${endpoint}`, {headers: headers});
    }

    public post(endpoint: string, data: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.post(`${this.baseUrl}/${endpoint}`, data, {responseType: 'json', headers: headers});
    }

    public download(endpoint: string, data: any): Observable<Blob> {
        const headers = this.getHeaders();

        return this.http.post(`${this.baseUrl}/${endpoint}`, data, {responseType: 'blob', headers: headers});
    }
}
