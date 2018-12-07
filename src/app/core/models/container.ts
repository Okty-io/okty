export default class Container {
    name: string;
    logo: string;
    config: Array<{
        id: string;
        label: string;
        fields: Array<{
            id: string;
            label: string;
            type: 'input' | 'select' | 'multi-select' | 'select-container';
            base: string;
            destination: 'id' | 'version' | 'ports' | 'volumes' | 'environment' | 'files' | 'docker-compose';
            value: string;
            validators: Array<{ [key: string]: any }>;
        }>;
    }>;
}
