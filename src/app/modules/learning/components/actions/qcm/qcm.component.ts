import { Component, Input, OnInit } from '@angular/core';
import Action from '../../../models/action';
import { FormGroup } from '@angular/forms';

@Component({
    templateUrl: './qcm.component.html',
    styleUrls: ['./qcm.component.scss']
})
export class QcmComponent implements OnInit {

    @Input() action: Action;

    public formGroup: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.formGroup = new FormGroup({});

        for (const question of this.action.config.questions) {
            console.log(question);
        }
    }

}
