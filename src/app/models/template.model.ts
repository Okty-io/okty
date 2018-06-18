import { ISearchable } from './ISearchable';

export class Template implements ISearchable {
  name: string;
  image: string;
  action: string;
  configPath: string;

  containers: Array<any>;
}
