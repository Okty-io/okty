import { Injectable } from '@angular/core';
import { ContainerArgs } from '../interfaces/api-data';
import { ContainerFormData } from '../interfaces/form-data';
import { Container, ContainerConfigField, ContainerConfigGroup } from '../models/container';

@Injectable({
    providedIn: 'root'
})
export class ContainerService {

    private output = {} as ContainerArgs;

    formDataToApiArg(container: Container, formData: ContainerFormData): ContainerArgs {
        this.output = {image: '', args: {}} as ContainerArgs;
        this.output.image = formData.image;

        container.config.forEach((group: ContainerConfigGroup) => {
            group.fields.forEach((field: ContainerConfigField) => {
                const name = group.id + '_' + field.id;

                switch (field.destination) {
                    case 'id':
                        this.addToId(formData.config[name]);
                        break;
                    case 'version':
                        this.addToVersion(formData.config[name]);
                        break;
                    case 'compose':
                        this.addToDockerCompose(field.base, formData.config[name]);
                        break;
                    case 'volumes':
                        this.addToVolumes(formData.config[name], field.base);
                        break;
                    case 'ports':
                        this.addToPorts(formData.config[name], field.base);
                        break;
                    case 'environments':
                        this.addToEnvironments(field.base, formData.config[name]);
                        break;
                    case 'files':
                        this.addToFiles(field.base, formData.config[name]);
                        break;
                    default:
                        console.error('Output not available:', field.destination);
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

        this.output.args.id = id;
    }

    private addToVersion(version: string): void {
        if (!version) {
            return;
        }

        this.output.args.version = version;
    }

    private addToVolumes(source: string, destination: string): void {
        if (!this.output.args.volumes) {
            this.output.args.volumes = [];
        }

        this.output.args.volumes.push({
            host: source,
            container: destination
        });
    }

    private addToPorts(source: string, destination: string): void {
        if (!this.output.args.ports) {
            this.output.args.ports = [];
        }

        this.output.args.ports.push({
            host: source,
            container: destination
        });
    }

    private addToEnvironments(key: string, value: string): void {
        if (!this.output.args.environments) {
            this.output.args.environments = [];
        }

        this.output.args.environments.push({
            key: key,
            value: value
        });
    }

    private addToFiles(key: string, value: string): void {
        if (!this.output.args.files) {
            this.output.args.files = [];
        }

        this.output.args.files.push({
            key: key,
            value: value
        });
    }

    private addToDockerCompose(key: string, value: string): void {
        if (!this.output.args.compose) {
            this.output.args.compose = [];
        }

        this.output.args.compose.push({
            key: key,
            value: value
        });
    }
}
