import { Container } from '../../models/container.model';
import { Template } from '../../models/template.model';

export interface IConfigService {
  getAllContainers(): Promise<Container[]>;

  getContainer(name: string): Promise<Container>;

  getAllTemplates(): Promise<Template[]>;

  getTemplate(name: string): Promise<Template>;
}
