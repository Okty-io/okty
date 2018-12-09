import { Injectable } from '@angular/core';
import { FormFieldData } from '../interfaces/form-field-data';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private containers: Array<FormFieldData[]>;

    constructor() {
        this.containers = [];
    }

    addContainer(data: FormFieldData[]): void {
        this.containers.push(data);
    }

    getContainers(): Array<FormFieldData[]> {
        return this.containers;
    }
}
