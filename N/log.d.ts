interface LogOptions {
    /** String to appear in the Title column on the Execution Log tab of the script deployment. Maximum length is 99 characters. */
    title: string;
    /**
     * You can pass any value for this parameter.
     * If the value is a JavaScript object type, JSON.stringify(obj) is called on the object before displaying the value.
     * NetSuite truncates any resulting string over 3999 characters.
     */
    details?: any;
}

/**
 * Note: If a client script is attached to a form, calls to any log function are ignored and nothing is logged. Use console.log instead.
 * Log calls from client scripts deployed at the record level, or called from a server script, work as usual.
 */
interface LogFunction {
    (title: string, details?: any): void;
    (options: LogOptions): void;
}

/**
 * @governance Amount of logging in any 60 minute period is limited (see N/log Module Guidelines)
 * @since 2016.1
 */
export const debug: LogFunction;
/**
 * @governance Amount of logging in any 60 minute period is limited (see N/log Module Guidelines)
 * @since 2016.1
 */
export const audit: LogFunction;
/**
 * @governance Amount of logging in any 60 minute period is limited (see N/log Module Guidelines)
 * @since 2016.1
 */
export const error: LogFunction;
/**
 * @governance Amount of logging in any 60 minute period is limited (see N/log Module Guidelines)
 * @since 2016.1
 */
export const emergency: LogFunction;
