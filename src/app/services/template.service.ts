import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../app.vars';
import { CacheService } from './cache.service';
import { Template } from '../models/template.model';

@Injectable()
export class TemplateService {

  private allTemplatesCacheKey = 'all_templates_cache_key';
  private templateConfigCacheKey = 'template_config_';

  private static nameWithoutExtension(name: string) {
    return name.substring(0, name.length - 4); // 4 = '.yml'
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

  public getAvailableTemplates(): Promise<Array<Template>> {
    return new Promise((resolve, reject) => {

      const cacheData = this.cache.get(this.allTemplatesCacheKey);
      if (cacheData) {
        resolve(cacheData);
        return;
      }

      const url = Config.getUrl(Config.GIT_TEMPLATES_PATH, '');
      console.log(url);
      const promises: Array<Promise<Template>> = [];
      this.http.get(url).subscribe((data: Array<any>) => {
        data.map(template => {
          const name = TemplateService.nameWithoutExtension(template.name);
          promises.push(this.getTemplateConfig(name));
        });

        Promise.all(promises).then(templates => {
          this.cache.set(this.allTemplatesCacheKey, templates);
          resolve(templates);
        }).catch(response => {
          const error = {
            message: response.error.message,
            status: response.status
          };
          TemplateService.ajaxError(error);
          reject(error);
        });
      }, (response) => {
        const error = {
          message: response.error.message,
          status: response.status
        };
        TemplateService.ajaxError(error);
        reject(error);
      });
    });
  }

  public getTemplateConfig(name: string): Promise<Template> {
    const url = Config.getUrl(Config.GIT_TEMPLATES_PATH, name + '.yml');

    return new Promise<Template>((resolve, reject) => {

      const cacheData = this.cache.get(this.templateConfigCacheKey + name);
      if (cacheData) {
        resolve(cacheData);
        return;
      }

      this.http.get(url).subscribe((file: { name: string, content: string }) => {
        const content = atob(file.content);
        const template: Template = YAML.parse(content);
        template.configPath = TemplateService.nameWithoutExtension(file.name);

        this.cache.set(this.templateConfigCacheKey + name, template);
        resolve(template);
      }, (response) => {
        const error = {
          message: response.error.message,
          status: response.status
        };
        TemplateService.ajaxError(error);
        reject(error);
      });
    });
  }
}
