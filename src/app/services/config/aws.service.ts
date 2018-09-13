import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Container } from '../../models/container.model';
import { Template } from '../../models/template.model';
import { IConfigService } from './IConfig.service';

@Injectable()
export class AwsService implements IConfigService {

  private static CONTAINERS_PATH = 'containers';
  private static TEMPLATES_PATH = 'templates';
  private static BUCKET_URL = 'https://s3.eu-west-3.amazonaws.com/okty/';

  private static fileExtension = '.yml';

  private static nameWithoutExtension(name: string) {
    return name.substring(0, name.length - AwsService.fileExtension.length);
  }

  private static getUrl(type: string = '', name: string = '') {
    let url = AwsService.BUCKET_URL;

    if (!name) {
      url += '?list-type=2&prefix=' + type;
    } else {
      url += type + '/' + name;
    }

    return url;
  }

  constructor(private http: HttpClient) {
  }

  public getAllContainers(): Promise<Container[]> {
    return this.getAvailableElements(AwsService.CONTAINERS_PATH) as Promise<Container[]>;
  }

  public getContainer(name: string): Promise<Container> {
    return this.getElement(AwsService.CONTAINERS_PATH, name + AwsService.fileExtension) as Promise<Container>;
  }

  public getAllTemplates(): Promise<Template[]> {
    return this.getAvailableElements(AwsService.TEMPLATES_PATH) as Promise<Template[]>;
  }

  public getTemplate(name: string): Promise<Template> {
    return this.getElement(AwsService.TEMPLATES_PATH, name + AwsService.fileExtension) as Promise<Template>;
  }

  private getAvailableElements(path: string): Promise<Container[] | Template[]> {
    return new Promise((resolve, reject) => {
      const url = AwsService.getUrl(path, '');
      const promises: Array<Promise<Container | Template>> = [];

      this.http.get(url, {responseType: 'text'}).subscribe((data: string) => {
        const parser = new DOMParser();
        const list = parser.parseFromString(data, 'text/xml');

        const files = list.getElementsByTagName('Contents');

        Array.from(files).map((element: Element) => {
          const name = element.querySelector('Key').textContent.substr(path.length + 1);
          promises.push(this.getElement(path, name));
        });

        Promise.all(promises)
          .then((elements: Container[] | Template[]) => resolve(elements))
          .catch(response => reject({message: response.error.message, status: response.status}));

      }, (response) => reject({message: response.error.message, status: response.status}));
    });
  }

  private getElement(path: string, name: string): Promise<Container | Template> {
    const url = AwsService.getUrl(path, name);

    return new Promise<Container | Template>((resolve, reject) => {
      this.http.get(url, {responseType: 'text'}).subscribe(content => {

        const element: Container | Template = YAML.parse(content);
        element.configPath = AwsService.nameWithoutExtension(name);

        resolve(element);
      }, (response) => reject({message: response.error.message, status: response.status}));
    });
  }

}
