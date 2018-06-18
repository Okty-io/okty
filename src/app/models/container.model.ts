import { ISearchable } from './ISearchable';

export class Container implements ISearchable {
  name: string;
  image: string;
  action: string;
  configPath: string;

  docker: string;
  version: string;
  config: Array<{
    id: string;
    label: string;
    fields: Array<{
      id: string;
      label: string;
      type: string;
      base: string;
      destination: string;
      value: string;
      data: string;
      validators: any;
    }>
  }>;

  output: string;
  containerId: string;
}
