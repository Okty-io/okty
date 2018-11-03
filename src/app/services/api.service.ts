import { Injectable } from '@angular/core';
import { Container } from '../models/container.model';
import { Template } from '../models/template.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getAllContainers(): Promise<Container[]> {
    return this.http.get(`${environment.api.host}/container/form`).toPromise() as Promise<Container[]>;
  }

  getContainer(name: string): Promise<Container> {
    return this.http.get(`${environment.api.host}/container/form/${name}`).toPromise() as Promise<Container>;
  }

  getAllTemplates(): Promise<Template[]> {
    return this.http.get(`${environment.api.host}/template/`).toPromise() as Promise<Template[]>;
  }

  getTemplate(name: string): Promise<Template> {
    return this.http.get(`${environment.api.host}/template/${name}`).toPromise() as Promise<Template>;
  }

  build(args: any[]): Promise<any> {
    return this.http.post(`${environment.api.host}/container/build`, args, {responseType: 'blob'}).toPromise();
  }
}
