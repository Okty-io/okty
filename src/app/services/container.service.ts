import {Container} from '../models/container.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../app.vars';

@Injectable()
export class ContainerService {

  constructor(private http: HttpClient) {
  }

  public getAvailableContainers(): Promise<Array<Container>> {
    return new Promise(resolve => {
      const url = Config.GIT_URL + Config.GIT_CONTAINERS_PATH;

      const promises: Array<Promise<Container>> = [];
      this.http.get(url).subscribe((data: Array<any>) => {
        data.map(container => {
          promises.push(this.getContainerConfig(container.name));
        });

        Promise.all(promises).then(containers => {
          resolve(containers);
        });
      });
    });
  }

  public getContainerConfig(name: string): Promise<Container> {
    const url = Config.GIT_URL + Config.GIT_CONTAINERS_PATH + '/' + name;

    return new Promise<any>(resolve => {
      this.http.get(url).subscribe((container: { content: string }) => {
        let content = atob(container.content);
        content = YAML.parse(content);

        resolve(content);
      });
    });
  }
}
