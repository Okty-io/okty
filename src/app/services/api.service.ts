import { Injectable } from '@angular/core';
import { Container } from '../models/container.model';
import { Template } from '../models/template.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
  }

  private post(query: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.api.host, {query: query}).toPromise()
        .then((response: { data: any, errors: any }) => {
          if (response.errors) {
            reject(response.errors);
          }

          resolve(response.data);
        });
    });
  }

  getAllContainers(): Promise<Container[]> {
    return new Promise<Container[]>((resolve) => {
      this.post(`query{containers{id,name,image}}`)
        .then(response => resolve(response.containers))
        .catch(() => resolve([]));
    });
  }

  getContainer(name: string): Promise<Container> {
    return new Promise<Container>((resolve) => {
      this.post(`
      {
        container(id: "${name}") {
          id
          name
          image
          config {
            id
            label
            fields {
              id,
              label
              type
              base
              destination
              value
              validators {
                name
                constraint
              }
            }
          }
        }
      }`)
        .then(response => resolve(response.container))
        .catch(() => resolve(null));
    });
  }

  getAllTemplates(): Promise<Template[]> {
    return new Promise<Template[]>((resolve) => {
      this.post(`query{templates{name,image}}`)
        .then(response => resolve(response.templates))
        .catch(() => resolve([]));
    });
  }

  getTemplate(name: string): Promise<Template> {
    return new Promise<Template>((resolve, reject) => {
      resolve(null);
    });
  }
}
