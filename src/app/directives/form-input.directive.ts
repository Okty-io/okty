import { ComponentFactoryResolver, Directive, Input, OnInit, Type, ViewContainerRef } from '@angular/core';
import { InputComponent } from '../components/setup/form/input/input.component';
import { SelectComponent } from '../components/setup/form/select/select.component';
import { VoidComponent } from '../components/setup/form/void.component';
import { MultiSelectComponent } from '../components/setup/form/multi-select/multi-select.component';
import { SelectContainerComponent } from '../components/setup/form/select-container/select-container.component';

@Directive({
  selector: '[appFormInput]'
})
export class FormInputDirective implements OnInit {

  @Input() appFormInput: any;
  @Input() appFormControl: string;

  constructor(private viewContainer: ViewContainerRef, private factory: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    const componentType = this.getComponentType();
    const componentFactory = this.factory.resolveComponentFactory(componentType);

    const component = this.viewContainer.createComponent(componentFactory);
    component.instance.formControl = this.appFormControl;
    component.instance.input = this.appFormInput;
  }

  private getComponentType(): Type<any> {
    const mapping = {
      'input': InputComponent,
      'multi-select': MultiSelectComponent,
      'select': SelectComponent,
      'select-container': SelectContainerComponent
    };

    if (!mapping[this.appFormInput.type]) {
      return VoidComponent;
    }

    return mapping[this.appFormInput.type];
  }
}
