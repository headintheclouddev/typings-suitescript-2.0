interface LogOptions {
    /** String to appear in the Title column on the Execution Log tab of the script deployment. Maximum length is 99 characters. */
    title?: string;
    /**
     * You can pass any value for this parameter.
     * If the value is a JavaScript object type, JSON.stringify(obj) is called on the object before displaying the value.
     * NetSuite truncates any resulting string over 3999 characters.
     */
    details: any;
}

interface LogFunction {
    (title: string, details: any): void;
    (options: LogOptions): void;
}

export const debug: LogFunction;
export const audit: LogFunction;
export const error: LogFunction;
export const emergency: LogFunction;
