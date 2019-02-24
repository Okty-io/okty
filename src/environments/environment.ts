// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api: {
        host: 'http://127.0.0.1:8080/v1'
    },
    github: {
        clientId: '84292809e436159ed5a3'
    },
    gitlab: {
        clientId: 'a24f92a5fb0d62e585ecadefb473c28e445197aaa8e95c2a7d44c0b26823efc8'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
