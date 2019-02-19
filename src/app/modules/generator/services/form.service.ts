import { Injectable } from '@angular/core';
import { Container, ContainerConfigField } from '../models/container';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ContainerFormData } from '../interfaces/form-data';
import { ContainerValidators } from '../validators/container.validators';

@Injectable()
export class FormService {

    constructor(private containerValidators: ContainerValidators) {
    }

    generateControl(field: ContainerConfigField): FormControl {
        const formControl = new FormControl(field.value);
        if (!field.validators) {
            return formControl;
        }

        const validators: ValidatorFn[] = [];
        for (const key in field.validators) {
            if (!field.validators.hasOwnProperty(key)) {
                continue;
            }

            const constraint: any = field.validators[key];

            switch (key) {
                case 'required':
                    validators.push(Validators.required);
                    break;
                case 'numbers':
                    validators.push(Validators.min(constraint.min));
                    validators.push(Validators.max(constraint.max));
                    validators.push(ContainerValidators.isNumberValidator);
                    break;
                case 'regex':
                    validators.push(Validators.pattern(constraint.toString()));
            }
        }

        if (field.destination === 'id') {
            validators.push(this.containerValidators.idUnique().bind(this.containerValidators));
        }

        formControl.setValidators(validators);

        return formControl;
    }

    // noinspection JSMethodCanBeStatic
    formToContainerData(data: FormGroup, container: Container) {
        const containerFormData = new ContainerFormData();
        containerFormData.image = container.id;
        containerFormData.form = container;
        containerFormData.config = data.value;

        return containerFormData;
    }
}
