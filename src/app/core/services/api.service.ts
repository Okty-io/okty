import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {

    private readonly baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.api.host;
    }

    public get(endpoint: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${endpoint}/`);
    }

    public post(endpoint: string, data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/${endpoint}`, data, {responseType: 'json'});
    }

    public download(endpoint: string, data: any): Observable<Blob> {
        return this.http.post(`${this.baseUrl}/${endpoint}/`, data, {responseType: 'blob'});
    }
}
