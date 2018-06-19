import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Container } from '../models/container.model';

@Injectable()
export class ContainerValidator {

  constructor(private projectService: ProjectService) {
  }

  public isIdUnique(containerIndex: number): any {
    return (control: FormControl) => {
      return new Promise(resolve => {
        const container = this.projectService.getContainers().find((element: Container, index: number) => {
          return element.containerId === control.value && index !== containerIndex;
        });

        const response = container ? {
          isIdUnique: {
            valid: false
          }
        } : null;

        resolve(response);
      });
    };
  }
}
