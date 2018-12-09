import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContainerConfigField } from '../../../../../core/models/container';

@Component({
    templateUrl: './select-container.component.html',
    styleUrls: ['./select-container.component.scss']
})
export class SelectContainerComponent implements OnInit {

    @Input() formControl: FormControl;
    @Input() field: ContainerConfigField;

    options: Array<{ label: string; value: string }>;

    ngOnInit(): void {
        this.options = [];
    }
}
