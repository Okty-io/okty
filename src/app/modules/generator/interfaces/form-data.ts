import { Container } from '../models/container';

export class ContainerFormData {
    image: string;
    form: Container;
    config: Array<FormFieldData[]>;
}

export interface FormFieldData {
    [key: string]: string;
}
