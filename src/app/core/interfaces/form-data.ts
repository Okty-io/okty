export class ContainerFormData {
    image: string;
    config: Array<FormFieldData[]>;
}

export interface FormFieldData {
    [key: string]: string;
}
