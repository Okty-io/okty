import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ContainerArgs } from '../interfaces/api-data';
import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class ProjectRepository {

    constructor(private api: ApiService) {
    }

    public build(apiArgs: ContainerArgs[]): Promise<Blob> {
        return this.api.download(`build`, apiArgs)
            .pipe(
                catchError((error: HttpErrorResponse) => throwError(error.message))
            )
            .toPromise();
    }
}
