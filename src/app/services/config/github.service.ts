import { Injectable } from '@angular/core';
import { CacheService } from '../cache.service';
import { HttpClient } from '@angular/common/http';
import { Container } from '../../models/container.model';
import { Template } from '../../models/template.model';
import { IConfigService } from './IConfig.service';

@Injectable()
export class GithubService implements IConfigService {

  private static GIT_CONTAINERS_PATH = 'config/containers';
  private static GIT_TEMPLATES_PATH = 'config/templates';
  private static GIT_USER = 'Okty-io';
  private static GIT_REPO = 'okty-config';
  private static GIT_BRANCHE = '?ref=master';
  private static GIT_URL = 'https://api.github.com/repos/' + GithubService.GIT_USER + '/' + GithubService.GIT_REPO + '/contents/';

  private static fileExtension = '.yml';

  private allContainersCacheKey = 'all_containers_cache_key';
  private containerConfigCacheKey = 'container_config_';

  private allTemplatesCacheKey = 'all_templates_cache_key';
  private templateConfigCacheKey = 'template_config_';

  private static getUrl(type: string, file: string): string {
    if (file) {
      file = '/' + file;
    }

    return GithubService.GIT_URL + type + file + GithubService.GIT_BRANCHE;
  }

  private static nameWithoutExtension(name: string) {
    return name.substring(0, name.length - GithubService.fileExtension.length);
  }

  private static ajaxError(error): void {
    if (error.status === 403) {
      alert('Le nombre max d\'appel API vers github est depassé pour cette IP. Revenez plus tard');
    } else {
      alert('An error occurred');
    }
  }

  constructor(private http: HttpClient, private cache: CacheService) {
  }

  public getAllContainers(): Promise<Container[]> {
    return this.getAvailableElements(
      GithubService.GIT_CONTAINERS_PATH,
      this.allContainersCacheKey,
      this.containerConfigCacheKey) as Promise<Container[]>;
  }

  public getContainer(name: string): Promise<Container> {
    return this.getElement(name, GithubService.GIT_CONTAINERS_PATH, this.containerConfigCacheKey) as Promise<Container>;
  }

  public getAllTemplates(): Promise<Template[]> {
    return this.getAvailableElements(
      GithubService.GIT_TEMPLATES_PATH,
      this.allTemplatesCacheKey,
      this.templateConfigCacheKey) as Promise<Template[]>;
  }

  public getTemplate(name: string): Promise<Template> {
    return this.getElement(name, GithubService.GIT_TEMPLATES_PATH, this.templateConfigCacheKey) as Promise<Template>;
  }

  private getAvailableElements(githubPath: string, allCacheKey: string, oneCacheKey: string): Promise<Container[] | Template[]> {
    return new Promise((resolve, reject) => {
      const cacheData = this.cache.get(allCacheKey);
      if (cacheData) {
        resolve(cacheData);
        return;
      }

      const url = GithubService.getUrl(githubPath, '');
      const promises: Array<Promise<Container | Template>> = [];

      this.http.get(url).subscribe((data: Array<any>) => {
        data.map(element => {
          const name = GithubService.nameWithoutExtension(element.name);
          promises.push(this.getElement(name, githubPath, oneCacheKey));
        });

        Promise.all(promises).then((elements: Container[] | Template[]) => {
          this.cache.set(allCacheKey, elements);
          resolve(elements);
        }).catch(response => {
          const error = {
            message: response.error.message,
            status: response.status
          };
          GithubService.ajaxError(error);
          reject(error);
        });
      }, (response) => {
        const error = {
          message: response.error.message,
          status: response.status
        };
        GithubService.ajaxError(error);
        reject(error);
      });
    });
  }

  private getElement(name: string, githubPath: string, oneCacheKey: string): Promise<Container | Template> {
    const url = GithubService.getUrl(githubPath, name + '.yml');

    return new Promise<Container | Template>((resolve, reject) => {

      const cacheData = this.cache.get(oneCacheKey + name);
      if (cacheData) {
        resolve(cacheData);
        return;
      }

      this.http.get(url).subscribe((file: { name: string, content: string }) => {
        const content = atob(file.content);
        const element: Container | Template = YAML.parse(content);
        element.configPath = GithubService.nameWithoutExtension(file.name);

        this.cache.set(oneCacheKey + name, element);
        resolve(element);
      }, (response) => {
        const error = {
          message: response.error.message,
          status: response.status
        };
        GithubService.ajaxError(error);
        reject(error);
      });
    });
  }

}
