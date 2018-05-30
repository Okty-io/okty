import {Container} from '../models/container.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../app.vars';
import {CacheService} from './cache.service';

@Injectable()
export class ContainerService {

  private allContainersCacheKey = 'all_containers_cache_key';
  private containerConfigCacheKey = 'container_config_';

  constructor(private http: HttpClient, private cache: CacheService) {
  }

  public getAvailableContainers(): Promise<Array<Container>> {
    return new Promise((resolve, reject) => {

      const cacheData = this.cache.get(this.allContainersCacheKey);
      if (cacheData) {
        resolve(cacheData);
        return;
      }

      const url = Config.GIT_URL + Config.GIT_CONTAINERS_PATH;
      const promises: Array<Promise<Container>> = [];
      this.http.get(url).subscribe((data: Array<any>) => {
        data.map(container => {
          const name = container.name.substring(0, container.name.length - 5);
          promises.push(this.getContainerConfig(name));
        });

        Promise.all(promises).then(containers => {
          this.cache.set(this.allContainersCacheKey, containers);
          resolve(containers);
        }).catch(response => {
          const error = {
            message: response.error.message,
            status: response.status
          };
          this.ajaxError(error);
          reject(error);
        });
      }, (response) => {
        const error = {
          message: response.error.message,
          status: response.status
        };
        this.ajaxError(error);
        reject(error);
      });
    });
  }

  public getContainerConfig(name: string): Promise<Container> {
    const url = Config.GIT_URL + Config.GIT_CONTAINERS_PATH + '/' + name + '.yaml';

    return new Promise<Container>((resolve, reject) => {

      const cacheData = this.cache.get(this.containerConfigCacheKey + name);
      if (cacheData) {
        resolve(cacheData);
        return;
      }

      this.http.get(url).subscribe((file: { name: string, content: string }) => {
        const content = atob(file.content);
        const container: Container = YAML.parse(content);
        container.configPath = file.name.substring(0, file.name.length - 5);

        this.cache.set(this.containerConfigCacheKey + name, container);
        resolve(container);
      }, (response) => {
        const error = {
          message: response.error.message,
          status: response.status
        };
        this.ajaxError(error);
        reject(error);
      });
    });
  }

  // noinspection JSMethodCanBeStatic
  public ajaxError(error): void {
    if (error.status === 403) {
      alert('Le nombre max d\'appel API vers github est depassé pour cette IP. Revenez plus tard');
    } else {
      alert('An error occurred');
    }
  }
}
