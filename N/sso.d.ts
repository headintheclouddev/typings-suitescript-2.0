/// <reference path="../typings/tsd.d.ts" />

interface GenerateSuiteSignOnTokenOptions {
    suiteSignOnId: string;
}

interface SsoModule {
    generateSuiteSignOnToken(options: GenerateSuiteSignOnTokenOptions): string;
}

declare module N {
    var sso: SsoModule;
}

declare module 'N/sso' {
    export = N.sso;
}
