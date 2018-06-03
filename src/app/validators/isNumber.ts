import { FormControl } from '@angular/forms';

export function isNumberValidator(formControl: FormControl) {
  const numberRegex = new RegExp('^[0-9]+$');

  return numberRegex.test(formControl.value) ? null : {
    number: {
      valid: false
    }
  };
}
