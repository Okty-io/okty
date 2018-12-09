export interface ContainerArgs {
    id: string;
    image: string;
    version: string;

    args: {
        ports: Array<any>;
        volumes: Array<any>;
        environments: Array<any>;
        files: Array<any>;
    };
}
