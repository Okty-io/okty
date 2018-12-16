import { Listable } from '../interfaces/listable';
import { FormFieldData } from '../interfaces/form-data';

export class Template implements Listable {
    id: string;
    name: string;
    logo: string;
    containers: Array<{
        image: string;
        config: Array<FormFieldData[]>;
    }>;

    getTitle(): string {
        return this.name;
    }

    getImage(): string {
        return this.logo;
    }

    getLink(): string {
        return '/generator/load/' + this.id;
    }
}
