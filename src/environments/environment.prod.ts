import { AwsService } from '../app/services/config/aws.service';

export const environment = {
  production: true,
  configService: AwsService,
  version: require('../../package.json').version
};
