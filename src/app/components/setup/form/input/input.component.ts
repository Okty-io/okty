import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() formControl: FormControl;
  @Input() input: any;
}
