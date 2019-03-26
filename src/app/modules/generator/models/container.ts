import { Listable } from '../interfaces/listable';

export class Container implements Listable {
    id: string;
    name: string;
    logo: string;
    config: ContainerConfigGroup[];

    getTitle(): string {
        return this.name;
    }

    getImage(): string {
        return this.logo;
    }

    getLink(): string {
        return '/generator/add/' + this.id;
    }
}

export interface ContainerConfigGroup {
    id: string;
    label: string;
    fields: Array<ContainerConfigField>;
}

export interface ContainerConfigField {
    id: string;
    label: string;
    type: 'input' | 'checkbox' | 'select-single' | 'select-multiple' | 'select-container' | 'hidden';
    base: string;
    destination: 'id' | 'version' | 'compose' | 'volumes' | 'ports' | 'environments' | 'files';
    value: string;
    validators: Array<ContainerConfigFieldValidator>;
    source: Array<{ [key: string]: string }>;
}

export interface ContainerConfigFieldValidator {
    [key: string]: string | object | number;
}
