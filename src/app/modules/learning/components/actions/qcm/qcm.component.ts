import { Component, Input, OnInit } from '@angular/core';
import Action from '../../../models/action';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './qcm.component.html',
    styleUrls: ['./qcm.component.scss']
})
export class QcmComponent implements OnInit {

    @Input() action: Action;

    public form: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({});

        this.action.config.questions.map((question, indexQuestion) => {
            const group = new FormGroup({});

            question.questions.map((label, indexLabel) => {
                let id = (indexLabel + 1).toString();
                if (question.responses.length <= 1) {
                    id = '0';
                }

                group.addControl(id, new FormControl(false));
            });

            this.form.addControl(indexQuestion.toString(), group);
        });
    }

    public submit(event): void {
        event.preventDefault();

        const values = this.form.value;

        this.action.config.questions.map((question, indexQuestion) => {
            if (question.responses.length > 1) {
                return;
            }

            const answered = values[indexQuestion][0];
            values[indexQuestion] = {};

            question.questions.map((label, indexLabel) => {
                values[indexQuestion][indexLabel + 1] = (indexLabel + 1 === parseInt(answered, 10));
            });
        });

        console.log(values);
    }

}
