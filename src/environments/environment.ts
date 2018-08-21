import { LocalService } from '../app/services/config/local.service';

export const environment = {
  production: false,
  configService: LocalService,
  version: require('../../package.json').version
};
