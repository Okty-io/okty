import { Listable } from '../interfaces/listable';

export class Template implements Listable {
    name: string;
    logo: string;
    containers: Array<{
        image: string;
        config: Array<{
            [key: string]: string;
        }>;
    }>;

    getTitle(): string {
        return this.name;
    }

    getImage(): string {
        return this.logo;
    }
}
