export class ContainerFormData {
    form: string;
    config: Array<FormFieldData[]>;
}

export interface FormFieldData {
    [key: string]: string;
}
