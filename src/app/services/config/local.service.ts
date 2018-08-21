import { Injectable } from '@angular/core';
import { IConfigService } from './IConfig.service';
import { Container } from '../../models/container.model';
import { Template } from '../../models/template.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocalService implements IConfigService {

  private static basePath = 'http://127.0.0.1:3000/';
  private static containersPath = 'containers';
  private static templatesPath = 'templates';
  private static fileExtension = '.yml';

  private static getContainersPath(): string {
    return LocalService.basePath + LocalService.containersPath;
  }

  private static getTemplatesPath(): string {
    return LocalService.basePath + LocalService.templatesPath;
  }

  private static handleError(error: any): void {
    if (error.status === 0) {
      alert('Configuration is missing. Checks console for more details.');
      console.error('Did you start the node server of the config repository ? http://github.com/okty-io/okty-config');
    } else {
      console.error(error.message);
    }
  }

  private static nameWithoutExtension(name: string) {
    return name.substring(0, name.length - LocalService.fileExtension.length);
  }

  constructor(private http: HttpClient) {
  }

  public getAllContainers(): Promise<Container[]> {
    return this.getAvailableElements(LocalService.getContainersPath()) as Promise<Container[]>;
  }

  getAllTemplates(): Promise<Template[]> {
    return this.getAvailableElements(LocalService.getTemplatesPath()) as Promise<Template[]>;
  }

  getContainer(name: string): Promise<Container> {
    return this.getElement(LocalService.getContainersPath(), name) as Promise<Container>;
  }

  getTemplate(name: string): Promise<Template> {
    return this.getElement(LocalService.getTemplatesPath(), name) as Promise<Template>;
  }

  private getAvailableElements(path: string): Promise<Container[] | Template[]> {
    return new Promise((resolve: Function) => {
      const promises: Array<Promise<Container | Template>> = [];

      this.http.get(path).subscribe((files: Array<string>) => {
        files.map((name: string) => {
          promises.push(this.getElement(path, name));
        });

        Promise.all(promises).then((elements: Array<Container | Template>) => {
          elements = elements.filter((element) => {
            return element != null;
          });

          resolve(elements);
        });
      }, (error) => {
        LocalService.handleError(error);
        resolve([]);
      });
    });
  }

  private getElement(basePath: string, name: string): Promise<Container | Template> {
    return new Promise<Container | Template>((resolve: Function) => {
      let path = basePath + '/' + name;
      if (!path.endsWith(LocalService.fileExtension)) {
        path += LocalService.fileExtension;
      }

      this.http.get(path).subscribe((file: { content: string }) => {
        const content = atob(file.content);
        const element: Container | Template = YAML.parse(content);
        element.configPath = LocalService.nameWithoutExtension(name);

        resolve(element);
      }, (error) => {
        LocalService.handleError(error);
        resolve(null);
      });
    });
  }
}
