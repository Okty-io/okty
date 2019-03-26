import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContainerConfigField } from '../../../models/container';

@Component({
    templateUrl: './void.component.html',
    styleUrls: ['./void.component.scss']
})
export class VoidComponent {

    @Input() formControl: FormControl;
    @Input() field: ContainerConfigField;

}
