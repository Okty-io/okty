export class OutputConfig {
  image: string;
  args: {
    id: string;
    version: string;
    files: any;
    environments: Array<any>;
    volumes: Array<any>;
  };
}
