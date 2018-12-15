import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Container, ContainerConfigField, ContainerConfigGroup } from '../../models/container';
import { FormService } from '../../services/form.service';
import { FormFieldData } from '../../interfaces/form-data';

@Component({
    selector: 'app-generator-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    @Input() container: Container;
    @Input() userData: Array<FormFieldData[]>;
    @Output() dataChange: EventEmitter<FormGroup> = new EventEmitter();

    formGroup: FormGroup;

    constructor(private formService: FormService) {
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({});

        this.initControls();
        this.initData();

        this.dataChange.emit(this.formGroup);
        this.formGroup.valueChanges.subscribe(() => this.dataChange.emit(this.formGroup));
    }

    getFormControl(group, field): AbstractControl {
        return this.formGroup.get(group.id + '_' + field.id);
    }

    private initControls(): void {
        this.container.config.forEach((group: ContainerConfigGroup) => {
            group.fields.forEach((field: ContainerConfigField) => {
                const formControl = this.formService.generateControl(field);
                const formControlName = group.id + '_' + field.id;

                this.formGroup.addControl(formControlName, formControl);
            });
        });
    }

    private initData(): void {
        if (this.userData) {
            for (const key in this.userData) {
                if (!this.userData.hasOwnProperty(key)) {
                    continue;
                }

                const control = this.formGroup.get(key);
                if (!control) {
                    continue;
                }

                control.setValue(this.userData[key]);
            }
        }
    }
}
