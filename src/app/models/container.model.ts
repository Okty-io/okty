export class Container {
  name: string;
  image: string;
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

  configPath: string;
  output: string;
  containerId: string;
}
