import { Pipe, PipeTransform } from '@angular/core';
import { ContainerConfigField } from '../../../core/models/container';

@Pipe({
    name: 'onlyVisibleField'
})
export class OnlyVisibleFieldPipe implements PipeTransform {

    transform(elements: ContainerConfigField[]): any {
        return elements.filter((element: ContainerConfigField) => element.type !== 'hidden');
    }

}
