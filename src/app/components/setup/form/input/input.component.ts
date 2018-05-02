import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  templateUrl: './input.component.html'
})
export class InputComponent {
  @Input() formControl: FormControl;
}
