import { Injectable } from '@angular/core';
import { ContainerFormData } from '../interfaces/form-data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SessionService {

    private readonly containers: ContainerFormData[];
    private containersObservable: BehaviorSubject<ContainerFormData[]>;
    private editing: string;

    constructor() {
        this.containers = [];
        this.containersObservable = new BehaviorSubject<ContainerFormData[]>(this.containers);
    }

    addContainer(data: ContainerFormData): void {
        const oldContainer = this.getContainer(data.id);

        if (oldContainer) {
            const index = this.containers.indexOf(oldContainer);
            this.containers[index] = data;
            return;
        }

        this.containers.push(data);
        this.containersObservable.next(this.containers);
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

    containersChange(): Observable<ContainerFormData[]> {
        return this.containersObservable.asObservable();
    }

    startEditing(id: string): void {
        this.editing = id;
    }

    stopEditing(): void {
        this.editing = '';
    }

    getEditingId(): string {
        return this.editing;
    }
}
