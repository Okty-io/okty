import { Component, Input } from '@angular/core';
import Step from '../../models/step';

@Component({
    selector: 'app-learning-lesson-step',
    templateUrl: './lesson-step.component.html',
    styleUrls: ['./lesson-step.component.scss']
})
export class LessonStepComponent {

    @Input() step: Step;

    completeStep(): void {
        this.step.validated = true;
    }

}
