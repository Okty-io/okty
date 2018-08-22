import { GithubService } from '../app/services/config/github.service';

export const environment = {
  production: true,
  configService: GithubService,
  version: require('../../package.json').version
};
