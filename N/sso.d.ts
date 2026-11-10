/** @deprecated As of NetSuite 2025.1, support ended for the SuiteSignOn feature, so the N/sso module is no longer supported. */
interface GenerateSuiteSignOnTokenOptions {
    suiteSignOnId: string;
}

/** @deprecated As of NetSuite 2025.1, the SuiteSignOn feature and the N/sso module are no longer supported. */
export function generateSuiteSignOnToken(options: GenerateSuiteSignOnTokenOptions): string;
