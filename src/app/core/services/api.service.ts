import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private readonly baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.api.host;
    }

    public get(endpoint: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${endpoint}/`);
    }
}
