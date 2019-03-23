import { Injectable } from '@angular/core';
import { ContainerArgs } from '../interfaces/api-data';
import { ContainerFormData } from '../interfaces/form-data';
import { Container, ContainerConfigField, ContainerConfigGroup } from '../models/container';

@Injectable()
export class ContainerService {

    formDataToApiArg(formData: ContainerFormData): ContainerArgs {
        const container: Container = formData.form;
        const output = {image: '', args: {}} as ContainerArgs;
        output.image = formData.image;

        container.config.forEach((group: ContainerConfigGroup) => {
            group.fields.forEach((field: ContainerConfigField) => {
                const name = group.id + '_' + field.id;

                switch (field.destination) {
                    case 'id':
                        this.addToId(output, formData.config[name]);
                        break;
                    case 'version':
                        this.addToVersion(output, formData.config[name]);
                        break;
                    case 'compose':
                        this.addToDockerCompose(output, field.base, formData.config[name]);
                        break;
                    case 'volumes':
                        this.addToVolumes(output, formData.config[name], field.base);
                        break;
                    case 'ports':
                        this.addToPorts(output, formData.config[name], field.base);
                        break;
                    case 'environments':
                        this.addToEnvironments(output, field.base, formData.config[name]);
                        break;
                    case 'files':
                        this.addToFiles(output, field.base, formData.config[name]);
                        break;
                    default:
                        console.error('Output not available:', field.destination);
                        break;
                }

            });
        });

        return output;
    }

    // noinspection JSMethodCanBeStatic
    private addToId(output: ContainerArgs, id: string): void {
        if (!id) {
            return;
        }

        output.args.id = id;
    }

    // noinspection JSMethodCanBeStatic
    private addToVersion(output: ContainerArgs, version: string): void {
        if (!version) {
            return;
        }

        output.args.version = version;
    }

    // noinspection JSMethodCanBeStatic
    private addToVolumes(output: ContainerArgs, source: string, destination: string): void {
        if (!output.args.volumes) {
            output.args.volumes = [];
        }

        output.args.volumes.push({
            host: source,
            container: destination
        });
    }

    // noinspection JSMethodCanBeStatic
    private addToPorts(output: ContainerArgs, source: string, destination: string): void {
        if (!output.args.ports) {
            output.args.ports = [];
        }

        if (!source) {
            return;
        }

        output.args.ports.push({
            host: source,
            container: destination
        });
    }

    // noinspection JSMethodCanBeStatic
    private addToEnvironments(output: ContainerArgs, key: string, value: string): void {
        if (!output.args.environments) {
            output.args.environments = [];
        }

        output.args.environments.push({
            key: key,
            value: value
        });
    }

    // noinspection JSMethodCanBeStatic
    private addToFiles(output: ContainerArgs, key: string, value: string): void {
        if (!output.args.files) {
            output.args.files = [];
        }

        output.args.files.push({
            key: key,
            value: value
        });
    }

    // noinspection JSMethodCanBeStatic
    private addToDockerCompose(output: ContainerArgs, key: string, value: string): void {
        if (!output.args.compose) {
            output.args.compose = [];
        }

        output.args.compose.push({
            key: key,
            value: value
        });
    }
}
