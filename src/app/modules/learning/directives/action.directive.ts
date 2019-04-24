import { ComponentFactoryResolver, Directive, Input, OnInit, Type, ViewContainerRef } from '@angular/core';
import { QcmComponent } from '../components/actions/qcm/qcm.component';
import { VoidComponent } from '../components/actions/void/void.component';
import Action from '../models/action';

@Directive({
    selector: '[appLearningAction]'
})
export class ActionDirective implements OnInit {

    @Input() action: Action;

    constructor(private viewContainer: ViewContainerRef, private factory: ComponentFactoryResolver) {
    }

    ngOnInit(): void {
        if (!this.action) {
            return;
        }

        const componentType = this.getComponentType();
        const componentFactory = this.factory.resolveComponentFactory(componentType);

        const component = this.viewContainer.createComponent(componentFactory);
        component.instance.action = this.action;
    }

    private getComponentType(): Type<any> {
        const mapping = {
            'qcm': QcmComponent,
        };

        if (!mapping[this.action.type]) {
            return VoidComponent;
        }

        return mapping[this.action.type];
    }
}
