import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContainerConfigField } from '../../../models/container';

@Component({
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

    @Input() formControl: FormControl;
    @Input() field: ContainerConfigField;

}
