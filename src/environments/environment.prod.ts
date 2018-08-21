// @ts-ignore
import * as Package from '../../package.json';
import { GithubService } from '../app/services/config/github.service';

export const environment = {
  production: true,
  configService: GithubService,
  version: Package.version
};
