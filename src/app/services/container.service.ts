import { Injectable } from '@angular/core';
import { Container } from '../models/container.model';

@Injectable()
export class ContainerService {

  private outputConfig: any;
  containerId: any;

  public dataToContainer(container: Container, data: any): Container {
    this.outputConfig = {};

    container.config.forEach((group) => {
      group.fields.forEach((input) => {
        const controlName = group.label + '_' + input.id;
        const value = data[controlName];
        input.data = value;

        switch (input.destination) {
          case 'docker-compose':
            this.addToDockerCompose(value, input);
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
          case 'id':
            this.addToId(value, input);
            break;
        }
      });
    });

    this.outputConfig['image'] = container.docker + ':' + container.version;

    container.output = this.outputConfig;
    container.containerId = this.containerId;

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

    this.outputConfig[input.base] = value;
  }

  private addToEnvironment(value: string, input: any): void {
    if (!this.outputConfig['environment']) {
      this.outputConfig['environment'] = [];
    }

    if (!value) {
      value = input.value;
    }

    this.outputConfig['environment'].push(input.base + '=' + value);
  }

  private addToVolumes(value: string, input: any): void {
    if (!this.outputConfig['volumes']) {
      this.outputConfig['volumes'] = [];
    }

    if (!value) {
      value = input.value;
    }

    this.outputConfig['volumes'].push(value + ':' + input.base);
  }

  private addToPorts(value: string, input: any): void {
    if (!this.outputConfig['ports']) {
      this.outputConfig['ports'] = [];
    }

    if (!value) {
      value = input.value;
    }

    this.outputConfig['ports'].push(value + ':' + input.base);
  }

  private addToId(value: string, input: any): void {
    if (!value) {
      value = input.value;
    }

    this.containerId = value;
  }
}
