import { Component, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
    selector: 'app-learning-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
    providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper {

    @Input() title: string;

    onClick(index: number): void {
        this.selectedIndex = index;
    }

    hasPrevious(): boolean {
        return this.selectedIndex > 0;
    }

    hasNext(): boolean {
        return this.selectedIndex + 1 < this.steps.length;
    }

    next(): void {
        if (!this.selected.completed) {
            return;
        }

        super.next();
    }

    @Input()
    handleEnd(): void {
    }
}
