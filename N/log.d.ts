/**
 * Use the N/log module to log script execution details. These methods can also be accessed using the global log object.
 * NetSuite governs the amount of logging: up to 100,000 log method calls across all scripts in a 60 minute period. Logs are purged after 30 days.
 * Supported script types: Client and server scripts. Calls are ignored in client scripts attached to a form (use console.log instead).
 */

interface LogOptions {
    /**
     * String to appear in the Title column on the Execution Log tab of the script deployment. Maximum length is 99 characters.
     * If null, an empty string, or omitted, 'Untitled' appears for the log entry.
     */
    title: string;
    /**
     * You can pass any value for this parameter.
     * If the value is a JavaScript object type, JSON.stringify(obj) is called on the object before displaying the value.
     * NetSuite truncates any resulting string over 3999 characters.
     */
    details?: unknown;
}

interface LogFunction {
    (title: string, details?: unknown): void;
    (options: LogOptions): void;
}

/**
 * Logs a Debug message. Debug messages appear only if the deployment Log Level is set to Debug.
 * Use this method for scripts in development.
 * @governance Amount of logging in any 60 minute period is limited (see N/log Module Guidelines)
 * @since 2016.1
 */
export const debug: LogFunction;
/**
 * Logs an Audit message. Audit messages appear if the deployment Log Level is set to Audit or Debug.
 * Use this method for scripts in production.
 * @governance Amount of logging in any 60 minute period is limited (see N/log Module Guidelines)
 * @since 2016.1
 */
export const audit: LogFunction;
/**
 * Logs an Error message. Error messages appear if the deployment Log Level is set to Audit, Debug, or Error.
 * Use this method for scripts in production.
 * @governance Amount of logging in any 60 minute period is limited (see N/log Module Guidelines)
 * @since 2016.1
 */
export const error: LogFunction;
/**
 * Logs an Emergency message. Emergency messages always appear.
 * Use this method for scripts in production.
 * @governance Amount of logging in any 60 minute period is limited (see N/log Module Guidelines)
 * @since 2016.1
 */
export const emergency: LogFunction;
