import { ISearchable } from './ISearchable';

export class Template implements ISearchable {
  name: string;
  logo: string;
  action: string;
  id: string;
  containers: Array<any>;
}
