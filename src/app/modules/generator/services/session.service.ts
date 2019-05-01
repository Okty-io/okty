import { Injectable } from '@angular/core';
import { ContainerFormData } from '../interfaces/form-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnalyticsService } from '../../../core/services/analytics.service';

@Injectable()
export class SessionService {

    private readonly containers: ContainerFormData[];
    private containersObservable: BehaviorSubject<ContainerFormData[]>;
    private editing: string;

    constructor(private analytics: AnalyticsService) {
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

        this.analytics.addToCart({
            id: data.form.id,
            name: data.form.name,
            variant: data.id
        });
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

        this.analytics.removeFromCart({
            id: container.form.id,
            name: container.form.name,
            variant: id
        });

        this.containers.splice(index, 1);
        this.containersObservable.next(this.containers);
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

    reset() {
        this.containers.length = 0;
        this.containersObservable.next(this.containers);
    }
}
