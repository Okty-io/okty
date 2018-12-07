import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ContainerService } from '../services/container.service';
import Container from '../models/container';

@Injectable()
export class ContainersResolver implements Resolve<any> {

    constructor(private containerService: ContainerService) {
    }

    resolve(): Promise<Container[]> {
        return this.containerService.getAll();
    }
}
