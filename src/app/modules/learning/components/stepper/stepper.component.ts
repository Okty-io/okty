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

    onClick(target: number): void {
        if (target > this.selectedIndex) {
            while (this.selectedIndex < target) {
                if (!this.selected.completed) {
                    return;
                }
                this.selectedIndex += 1;
            }
        }

        if (target < this.selectedIndex) {
            this.selectedIndex = target;
        }
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
