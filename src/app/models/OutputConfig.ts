export class OutputConfig {
  image: string;
  args: {
    id: string;
    version: string;
    files: Array<any>;
    environments: Array<any>;
    volumes: Array<any>;
  };
}
