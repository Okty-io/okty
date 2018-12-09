import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Container } from '../models/container';

@Injectable({
    providedIn: 'root'
})
export class ContainerService {

    constructor(private api: ApiService) {
    }

    public getAll(): Observable<Container[]> {
        return this.api.get('container/form').pipe(
            map((elements: Array<object>) => {
                return elements.map(element => Object.assign(new Container, element));
            }),
            catchError((error: HttpErrorResponse) => {
                console.error(error.message);
                return of([]);
            })
        );
    }

    public getOne(id: string): Observable<Container> {
        return this.api.get(`container/form/${id}`).pipe(
            map((element: object) => Object.assign(new Container, element)),
            catchError((response: HttpErrorResponse) => throwError(response.error.error ? response.error.error : 'Error'))
        );
    }
}
