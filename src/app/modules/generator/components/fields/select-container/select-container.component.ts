import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContainerConfigField } from '../../../models/container';
import { SessionService } from '../../../services/session.service';
import { ContainerFormData } from '../../../interfaces/form-data';
import { ContainerService } from '../../../services/container.service';

@Component({
    templateUrl: './select-container.component.html',
    styleUrls: ['./select-container.component.scss']
})
export class SelectContainerComponent implements OnInit {

    @Input() formControl: FormControl;
    @Input() field: ContainerConfigField;

    options: Array<{ label: string; value: string }>;

    constructor(private session: SessionService, private containerService: ContainerService) {
    }

    ngOnInit(): void {
        this.options = [];

        this.session.getContainers().forEach((data: ContainerFormData) => {
            const container = this.containerService.formDataToApiArg(data);

            this.options.push({
                label: container.args.id,
                value: container.args.id
            });
        });

        const containerExists = this.options.find((option) => {
            return option.value === this.formControl.value;
        });

        if (this.formControl.value.trim().length === 0 || !containerExists) {
            this.formControl.setValue(null);
        }
    }
}
