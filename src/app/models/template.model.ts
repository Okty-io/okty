import { ISearchable } from './ISearchable';

export class Template implements ISearchable {
  name: string;
  image: string;
  action: string;
  path: string;

  containers: Array<any>;
}
