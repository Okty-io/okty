import { Injectable } from '@angular/core';
import { Container } from '../models/container.model';
import { OutputConfig } from '../models/OutputConfig';

@Injectable()
export class ContainerService {

  private outputConfig: OutputConfig;

  public dataToContainer(container: Container, data: any): Container {
    this.outputConfig = {image: '', args: {}} as OutputConfig;
    this.outputConfig.image = container.id;

    container.config.forEach((group) => {
      group.fields.forEach((input) => {
        const controlName = group.id + '_' + input.id;

        const value = data[controlName];
        input.data = value;

        switch (input.destination) {
          case 'docker-compose':
            this.addToDockerCompose(value, input);
            break;
          case 'version':
            this.addToVersion(value, input);
            break;
          case 'environment':
            this.addToEnvironment(value, input);
            break;
          case 'volumes':
            this.addToVolumes(value, input);
            break;
          case 'ports':
            this.addToPorts(value, input);
            break;
          case 'files':
            this.addToFiles(value, input);
            break;
          case 'id':
            this.addToId(value, input);
            break;
        }
      });
    });

    container.output = JSON.parse(JSON.stringify(this.outputConfig));
    container.containerId = this.outputConfig.args.id;

    return container;
  }

  private addToDockerCompose(value: string, input: any): void {
    if (!value) {
      value = input.value;
    }

    const notOverridableFolder: Array<string> = ['volumes', 'environment', 'ports'];
    if (notOverridableFolder.includes(input.base)) {
      return;
    }

    if (input.base === 'command') {
      this.outputConfig.args[input.base] = ['/bin/sh', '-c', value];

      return;
    }

    this.outputConfig.args[input.base] = value;
  }

  private addToVersion(value: string, input: any): void {
    if (!value) {
      value = input.value;
    }

    this.outputConfig.args.version = value;
  }

  private addToEnvironment(value: string, input: any): void {
    if (!this.outputConfig.args['environments']) {
      this.outputConfig.args['environments'] = [];
    }

    if (!value) {
      value = input.value;
    }

    this.outputConfig.args['environments'].push(input.base + '=' + value);
  }

  private addToVolumes(value: string, input: any): void {
    if (!this.outputConfig.args['volumes']) {
      this.outputConfig.args['volumes'] = [];
    }

    if (!value) {
      value = input.value;
    }

    this.outputConfig.args['volumes'].push(value + ':' + input.base);
  }

  private addToPorts(value: string, input: any): void {
    if (!this.outputConfig.args['ports']) {
      this.outputConfig.args['ports'] = [];
    }

    if (!value) {
      value = input.value;
    }

    this.outputConfig.args['ports'].push(value + ':' + input.base);
  }

  private addToFiles(value: string, input: any): void {
    if (!this.outputConfig.args['files']) {
      this.outputConfig.args['files'] = {};
    }

    if (!value) {
      value = input.value;
    }

    this.outputConfig.args['files'][input.base] = value;
  }

  private addToId(value: string, input: any): void {
    if (!value) {
      value = input.value;
    }

    this.outputConfig.args['id'] = value;
  }
}
