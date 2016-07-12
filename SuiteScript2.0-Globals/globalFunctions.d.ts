interface LogFunction {
    (title: string, details: string);
}

interface LogInterface {
    debug: LogFunction;
    audit: LogFunction;
    error: LogFunction;
    emergency: LogFunction;
}

declare var log: LogInterface;

interface UtilInterface {
    each: any;
    extend: any;
    isArray: (toTest: any) => boolean;
    isBoolean: (toTest: any) => boolean;
    isDate: (toTest: any) => boolean;
    isFunction: (toTest: any) => boolean;
    isNumber: (toTest: any) => boolean;
    isObject: (toTest: any) => boolean;
    isRegExp: (toTest: any) => boolean;
    isString: (toTest: any) => boolean;
    trim: (toTrim: string) => string;
}

declare var util: UtilInterface;

interface Window { // Fun undocumented NetSuite stuff
    /**
     * Gets the value of a URL parameter (undocumented NetSuite method).
     * @param {string} parameter The URL parameter to get the value of.
     */
    getParameter(parameter: string): string;
}

/**
 * Client method to submit the current record (undocumented NetSuite method).
 * @param {string} name The name of the save button to trigger.
 * @param {boolean} arg2 Not really sure what this parameter is used for.
 */
declare function NLDoMainFormButtonAction(name: string, arg2: boolean): void;

/**
 * Standard module loading function ala RequireJS.
 * Always available in SSv2 contexts.
 */
declare function require(modules: string[], callback?: (...any) => any);
