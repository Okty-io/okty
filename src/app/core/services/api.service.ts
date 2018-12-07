import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.api.host;
    }

    public get(endpoint: string): Promise<any> {
        return this.http.get(`${this.baseUrl}/${endpoint}`).toPromise();
    }
}
