import { ISearchable } from './ISearchable';
import { OutputConfig } from './OutputConfig';

export class Container implements ISearchable {
  name: string;
  logo: string;
  action: string;

  id: string;
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

  output: OutputConfig;
  containerId: string;
}
