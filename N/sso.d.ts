/**
 * @deprecated As of NetSuite 2025.1, support ended for the SuiteSignOn feature, so the N/sso module is no longer supported.
 * Scripts that include the N/sso module will throw an error. Remove usages of this module.
 */

interface GenerateSuiteSignOnTokenOptions {
    /** The script ID of the SuiteSignOn record. */
    suiteSignOnId: string;
}

/**
 * Generates a new SuiteSignOn token for a user.
 * @deprecated As of NetSuite 2025.1, the SuiteSignOn feature and the N/sso module are no longer supported.
 */
export function generateSuiteSignOnToken(options: GenerateSuiteSignOnTokenOptions): string;
