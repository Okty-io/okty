import { Listable } from '../interfaces/listable';

export class Container implements Listable {
    name: string;
    logo: string;
    config: ContainerConfigGroup[];

    getTitle(): string {
        return this.name;
    }

    getImage(): string {
        return this.logo;
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
    destination: 'id' | 'version' | 'ports' | 'volumes' | 'environment' | 'files' | 'docker-compose';
    value: string;
    validators: Array<ContainerConfigFieldValidator>;
    source: Array<{ [key: string]: string }>;
}

export interface ContainerConfigFieldValidator {
    [key: string]: string | object | number;
}
