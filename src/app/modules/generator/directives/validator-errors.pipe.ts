import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'validatorErrors'
})
export class ValidatorErrorsPipe implements PipeTransform {
    transform(errors: any, args: string[]): string {
        for (const key in errors) {
            if (!errors.hasOwnProperty(key)) {
                continue;
            }

            switch (key) {
                case 'required':
                    return 'This field is required';
                case 'max':
                    return 'Max value is ' + errors[key].max;
                case 'min':
                    return 'Min value is ' + errors[key].min;
                case 'number':
                    return 'Value has to be a number';
                case 'pattern':
                    return 'Wrong value format';
                case 'idUnique':
                    return 'Container ID has to be unique';
            }
        }

        return 'Something went wrong';
    }
}
