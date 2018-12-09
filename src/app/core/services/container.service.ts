import { Injectable } from '@angular/core';
import { ContainerArgs } from '../interfaces/api-data';
import { ContainerFormData } from '../interfaces/form-data';
import { Container, ContainerConfigField, ContainerConfigGroup } from '../models/container';

@Injectable({
    providedIn: 'root'
})
export class ContainerService {

    private output = {} as ContainerArgs;


    // noinspection JSMethodCanBeStatic
    formDataToApiArg(container: Container, formData: ContainerFormData): ContainerArgs {
        this.output = {} as ContainerArgs;
        this.output.image = formData.image;

        container.config.forEach((group: ContainerConfigGroup) => {
            group.fields.forEach((field: ContainerConfigField) => {
                const name = group.id + '_' + field.id;

                console.log([field, name, formData.config[name]]);
                switch (field.destination) {
                    case 'id':
                        this.addToId(formData.config[name]);
                        break;
                    case 'version':
                        this.addToVersion(formData.config[name]);
                        break;
                }

            });
        });

        return this.output;
    }

    private addToId(id: string): void {
        if (!id) {
            return;
        }

        this.output.id = id;
    }

    private addToVersion(version: string): void {
        if (!version) {
            return;
        }

        this.output.version = version;
    }

}
