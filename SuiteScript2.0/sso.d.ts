/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface SsoModule {
    generateSuiteSignOnToken(options: GenerateSuiteSignOnTokenOptions): string;
}

declare var _: SsoModule;
export = _;
