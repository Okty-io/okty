import { Container } from '../models/container';

export class ContainerFormData {
    id: string;
    image: string;
    form: Container;
    config: Array<FormFieldData[]>;

    constructor() {
        this.id = (new Date().getTime() + Math.floor((Math.random() * 10000) + 1)).toString(16);
    }
}

export interface FormFieldData {
    [key: string]: string;
}
