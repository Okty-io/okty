export interface ContainerArgs {
    image: string;

    args: {
        id: string;
        version: string;
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
        compose: Array<{
            key: string;
            value: string;
        }>
    };
}
