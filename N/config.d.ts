/// <reference path="../typings/index.d.ts" />

interface ConfigSetValueOptions {
    name: string;
    text: (string|string[]);
}

interface ConfigSetTextOptions {
    name: string;
    text: (string|string[]);
}

interface ConfigGetOptions {
    name: string;
}

interface Config {
    names: string;
    type: string;
    /**
     * Description TBA (5/9/2016)
     */
    getField (options: ConfigGetOptions): Object;

    getText (options: ConfigGetOptions): (string|string[]);
    /**
     * Description TBA (5/9/2016)
     */
    getValue (options: ConfigGetOptions): (string|string[]|boolean);
    /**
     * Description TBA (5/9/2016)
     */
    save (): void;
    /**
     * Description TBA (5/9/2016)
     */
    setText (options: ConfigSetTextOptions): Config;
    /**
     * Description TBA (5/9/2016)
     */
    setValue (options: ConfigSetValueOptions): Config;
}

interface ConfigTypes {
    USER_PREFERENCES: string;
    COMPANY_INFORMATION: string;
    COMPANY_PREFERENCES: string;
    ACCOUNTING_PREFERENCES: string;
    ACCOUNTING_PERIODS: string;
    TAX_PERIODS: string;
    FEATURES: string;
}

interface LoadOptions {
    /**
     * Use the config.Type enumeration.
     */
    type: string;
}

interface ConfigModule {
    /**
     * Method used to load a record.Record object that encapsulates the specified NetSuite configuration page.
     */
    load (options: LoadOptions): Config;
    /**
     * Enumeration that holds the string values for supported configuration pages. 
     * This enum is used to set the value of the Record.type property.
     * Note that the Record.type property is read-only.
     */
    Type: ConfigTypes;
}

declare module N {
    var config: ConfigModule;
}
/**
 * Load the N/config module when you want to access NetSuite configuration settings. 
 * The config.load(options) method returns a record.Record object. Use the record.Record 
 * object members to access configuration settings. You do not need to load the record module to do this.
 */
declare module 'N/config' {
    export = N.config;
}
