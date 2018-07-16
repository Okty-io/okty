import { Injectable } from '@angular/core';
import { IConfigService } from './IConfig.service';
import { Container } from '../../models/container.model';
import { Template } from '../../models/template.model';
import { Config } from '../../app.vars';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocalService implements IConfigService {

  constructor(private http: HttpClient) {
  }

  public getAllContainers(): Promise<Container[]> {
    return this.getAvailableElements(Config.GIT_CONTAINERS_PATH) as Promise<Container[]>;
  }

  getAllTemplates(): Promise<Template[]> {
    return undefined;
  }

  getContainer(name: string): Promise<Container> {
    return undefined;
  }

  getTemplate(name: string): Promise<Template> {
    return undefined;
  }

  private getAvailableElements(path: string): Promise<Container[] | Template[]> {
    return new Promise((resolve: Function) => {
      resolve([]);
    });
  }

  private getElement(path: string, name: string): Promise<Container | Template> {
    return new Promise<Container | Template>((resolve: Function) => {
      resolve(null);
    });
  }

}
