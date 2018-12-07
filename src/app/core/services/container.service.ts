import { Injectable } from '@angular/core';
import Container from '../models/container';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class ContainerService {

    constructor(private api: ApiService) {
    }

    public getAll(): Promise<Container[]> {
        return new Promise<Container[]>(async (resolve) => {
            const elements: Array<object> = await this.api.get('container/form');
            const containers = [];

            elements.forEach(container => {
                containers.push(Object.assign(new Container, container));
            });

            resolve(containers);
        });
    }
}
