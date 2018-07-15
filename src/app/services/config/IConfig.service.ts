export interface IConfigService {
  getAllContainers(): Promise<Array<any>>;

  getContainer(name: string): Promise<any>;

  getAllTemplates(): Promise<Array<any>>;

  getTemplate(name: string): Promise<any>;
}
