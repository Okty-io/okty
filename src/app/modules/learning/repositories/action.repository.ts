import { Injectable } from '@angular/core';
import ActionResponse from '../models/action-response';
import { ApiService } from '../../../core/services/api.service';
import Action from '../models/action';

@Injectable()
export class ActionRepository {

    constructor(private apiService: ApiService) {
    }

    public checkResult(action: Action, values: any): Promise<ActionResponse> {
        const data = {
            id: action.id,
            values: values
        };

        return this.apiService.post('learning/check', data).toPromise();
    }

}
