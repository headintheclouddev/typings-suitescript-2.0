export interface GenerateSuiteSignOnTokenOptions {
    suiteSignOnId: string;
}

export interface SsoModule {
    generateSuiteSignOnToken(options: GenerateSuiteSignOnTokenOptions): string;
}

export default SsoModule;
