import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Template } from '../models/template';
import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class TemplateRepository {

    constructor(private api: ApiService) {
    }

    public getAll(): Observable<Template[]> {
        return this.api.get('templates').pipe(
            map((elements: Array<object>) => {
                return elements.map(element => Object.assign(new Template, element));
            }),
            catchError(() => of([]))
        );
    }

    public getOne(id: string): Observable<Template> {
        return this.api.get(`templates/${id}`)
            .pipe(
                map((element: object) => Object.assign(new Template, element)),
                catchError((response: HttpErrorResponse) => throwError(response.error.error ? response.error.error : 'Error'))
            );
    }
}
