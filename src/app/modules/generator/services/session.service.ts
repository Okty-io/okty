import { Injectable } from '@angular/core';
import { ContainerFormData } from '../interfaces/form-data';

@Injectable()
export class SessionService {

    private readonly containers: Array<ContainerFormData>;

    constructor() {
        this.containers = [];
    }

    addContainer(data: ContainerFormData): void {
        const oldContainer = this.getContainer(data.id);

        if (oldContainer) {
            const index = this.containers.indexOf(oldContainer);
            this.containers[index] = data;
            return;
        }

        this.containers.push(data);
    }

    getContainers(): Array<ContainerFormData> {
        return this.containers;
    }

    getContainer(id: string) {
        return this.containers.find((formData: ContainerFormData) => formData.id === id);
    }

    removeContainer(id: string) {
        const container = this.getContainer(id);
        const index = this.containers.indexOf(container);

        this.containers.splice(index, 1);
    }
}
