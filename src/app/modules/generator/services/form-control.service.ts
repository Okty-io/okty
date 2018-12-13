import { Injectable } from '@angular/core';
import { ContainerConfigField } from '../models/container';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { isNumberValidator } from '../validators/is-number.validator';

@Injectable()
export class FormControlService {

    // noinspection JSMethodCanBeStatic
    generate(field: ContainerConfigField): FormControl {
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
                    validators.push(isNumberValidator);
                    break;
                case 'regex':
                    validators.push(Validators.pattern(constraint.toString()));
            }
        }

        formControl.setValidators(validators);

        return formControl;
    }
}
