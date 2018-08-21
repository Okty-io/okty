// @ts-ignore
import * as Package from '../../package.json';
import { LocalService } from '../app/services/config/local.service';

export const environment = {
  production: false,
  configService: LocalService,
  version: Package.version
};
