import { Injectable } from '@angular/core';
import { SessionService } from '../services/session.service';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ContainerFormData } from '../interfaces/form-data';

@Injectable()
export class ContainerValidators {

    constructor(private sessionService: SessionService) {
    }

    static isNumberValidator(formControl: FormControl): ValidationErrors | null {
        if (!formControl.value) {
            return null;
        }

        const numberRegex = new RegExp('^[0-9]+$');

        return numberRegex.test(formControl.value) ? null : {
            number: {
                valid: false
            }
        };
    }

    public idUnique(): ValidatorFn {
        return (control: FormControl): ValidationErrors | null => {
            const editingId = this.sessionService.getEditingId();
            const similarContainer: ContainerFormData = this.sessionService.getContainers()
                .find((data: ContainerFormData) => {
                    return (data.config['general_name'] === control.value) && data.id !== editingId;
                });

            let response = null;
            if (similarContainer) {
                response = {
                    idUnique: {
                        valid: false
                    }
                };
            }

            return response;
        };
    }
}
