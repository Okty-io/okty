import { Injectable } from '@angular/core';
import { ContainerFormData } from '../interfaces/form-data';

@Injectable()
export class SessionService {

    private readonly containers: Array<ContainerFormData>;

    constructor() {
        this.containers = [];
    }

    addContainer(data: ContainerFormData): void {
        this.containers.push(data);
    }

    getContainers(): Array<ContainerFormData> {
        return this.containers;
    }
}
