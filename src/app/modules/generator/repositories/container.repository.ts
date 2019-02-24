import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Container } from '../models/container';
import { ContainerArgs } from '../interfaces/api-data';
import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class ContainerRepository {

    constructor(private api: ApiService) {
    }

    public getAll(): Observable<Container[]> {
        return this.api.get('containers').pipe(
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
        return this.api.get(`containers/${id}`)
            .pipe(
                map((element: object) => Object.assign(new Container, element)),
                catchError((response: HttpErrorResponse) => throwError(response.error.error ? response.error.error : 'Error'))
            );
    }

    public getPreview(apiArg: ContainerArgs): Promise<string> {
        return this.api.post('preview', apiArg)
            .pipe(
                map((response: { content: string }) => response.content),
                catchError((error: HttpErrorResponse) => throwError(error.message))
            )
            .toPromise();
    }

    public getFullPreview(apiArgs: ContainerArgs[]): Promise<string> {
        return this.api.post(`preview/full`, apiArgs)
            .pipe(
                map((response: { content: string }) => response.content),
                catchError((error: HttpErrorResponse) => throwError(error.message))
            )
            .toPromise();
    }
}
