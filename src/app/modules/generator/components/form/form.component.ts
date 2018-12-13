import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Container, ContainerConfigField, ContainerConfigGroup } from '../../models/container';
import { FormControlService } from '../../services/form-control.service';

@Component({
    selector: 'app-generator-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    @Input() container: Container;
    @Output() dataChange: EventEmitter<FormGroup> = new EventEmitter();

    formGroup: FormGroup;

    constructor(private formControlService: FormControlService) {
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({});

        this.container.config.forEach((group: ContainerConfigGroup) => {
            group.fields.forEach((field: ContainerConfigField) => {
                const formControl = this.formControlService.generate(field);
                const formControlName = group.id + '_' + field.id;

                this.formGroup.addControl(formControlName, formControl);
            });
        });

        this.dataChange.emit(this.formGroup);
        this.formGroup.valueChanges.subscribe(() => this.dataChange.emit(this.formGroup));
    }

    getFormControl(group, field): AbstractControl {
        return this.formGroup.get(group.id + '_' + field.id);
    }
}
