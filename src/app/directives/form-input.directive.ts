import {ComponentFactoryResolver, Directive, Input, OnInit, Type, ViewContainerRef} from '@angular/core';
import {InputComponent} from '../components/setup/form/input/input.component';
import {PortComponent} from '../components/setup/form/port/port.component';
import {VoidComponent} from '../components/setup/form/void.component';

@Directive({
  selector: '[appFormInput]'
})
export class FormInputDirective implements OnInit {

  @Input() appFormInput: string;

  constructor(private viewContainer: ViewContainerRef, private factory: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    const componentType = this.getComponentType();
    const componentFactory = this.factory.resolveComponentFactory(componentType);

    this.viewContainer.createComponent(componentFactory);
  }

  private getComponentType(): Type<any> {
    const mapping = {
      input: InputComponent,
      port: PortComponent
    };

    if (!mapping[this.appFormInput]) {
      return VoidComponent;
    }

    return mapping[this.appFormInput];
  }
}
