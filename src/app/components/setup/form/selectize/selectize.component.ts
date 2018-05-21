import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-selectize',
  templateUrl: './selectize.component.html',
  styleUrls: ['./selectize.component.scss']
})
export class SelectizeComponent {
  @Input() formControl: FormControl;
  constructor() { }


}
