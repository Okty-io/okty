import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContainerConfigField } from '../../../models/container';

@Component({
    templateUrl: './select-single.component.html',
    styleUrls: ['./select-single.component.scss']
})
export class SelectSingleComponent implements OnInit {

    @Input() formControl: FormControl;
    @Input() field: ContainerConfigField;

    options: Array<{ label: string; value: string }>;

    ngOnInit(): void {
        this.options = [];
        for (const key in this.field.source) {
            if (!this.field.source.hasOwnProperty(key)) {
                continue;
            }

            this.options.push({
                label: this.field.source[key].toString(),
                value: key
            });
        }

        if (!this.formControl.value || this.formControl.value.trim().length === 0) {
            this.formControl.setValue(this.options[0].value);
        }
    }
}
