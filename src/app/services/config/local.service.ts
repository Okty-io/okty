import { Injectable } from '@angular/core';
import { IConfigService } from './IConfig.service';

@Injectable()
export class LocalService implements IConfigService {
  getAllContainers(): Promise<Array<any>> {
    return undefined;
  }

  getAllTemplates(): Promise<Array<any>> {
    return undefined;
  }

  getContainer(name: string): Promise<any> {
    return undefined;
  }

  getTemplate(name: string): Promise<any> {
    return undefined;
  }
}
