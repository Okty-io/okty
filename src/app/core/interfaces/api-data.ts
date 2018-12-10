export interface ContainerArgs {
    id: string;
    image: string;
    version: string;

    args: {
        ports: Array<{
            host: string;
            container: string;
        }>;
        volumes: Array<{
            host: string;
            container: string;
        }>;
        environments: Array<{
            key: string;
            value: string;
        }>;
        files: Array<{
            key: string;
            value: string;
        }>;
    };
}
