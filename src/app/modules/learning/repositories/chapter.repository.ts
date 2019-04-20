import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Chapter from '../models/chapter';
import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class ChapterRepository {

    constructor(private api: ApiService) {
    }

    public getAll(): Observable<Chapter[]> {
        return this.api.get('chapters');
    }
}
