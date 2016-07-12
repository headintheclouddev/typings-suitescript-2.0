/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

export interface SsoModule {
    generateSuiteSignOnToken(options: GenerateSuiteSignOnTokenOptions): string;
}

export default SsoModule;
