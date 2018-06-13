import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Injectable()
export class ContainerValidator {

  constructor(private projectService: ProjectService) {
  }

  public isIdUnique(control: FormControl): any {
    return new Promise(resolve => {
      const isUsed = this.projectService.getContainer(control.value) !== null;

      const response = isUsed ? {
        isIdUnique: {
          valid: false
        }
      } : null;

      resolve(response);
    });
  }
}
