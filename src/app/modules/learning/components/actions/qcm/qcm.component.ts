import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Action from '../../../models/action';
import { FormControl, FormGroup } from '@angular/forms';
import ActionResponse from '../../../models/action-response';
import { ActionRepository } from '../../../repositories/action.repository';

@Component({
    templateUrl: './qcm.component.html',
    styleUrls: ['./qcm.component.scss']
})
export class QcmComponent implements OnInit {

    @Input() action: Action;
    @Output() validateAction: EventEmitter<boolean>;

    public form: FormGroup;
    public validated: boolean;

    constructor(private actionRepository: ActionRepository) {
    }

    ngOnInit() {
        this.validated = null;
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

    public submit(): void {
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

        this.actionRepository.checkResult(this.action, values)
            .then((response) => this.handleResponse(response))
            .catch(() => this.handleError());
    }

    private handleResponse(response: ActionResponse): void {
        if (response.validated) {
            this.validated = true;
            this.validateAction.emit(true);

            return;
        }

        this.validated = false;
        this.validateAction.emit(false);
        response.details.errors.map((id) => {
            this.form.get(id.toString()).setErrors({api: true});
        });
    }

    private handleError(): void {
        this.validated = false;
        this.validateAction.emit(false);
    }

    public isGroupInvalid(id: number): boolean {
        return this.form.get(id.toString()).invalid;
    }
}
