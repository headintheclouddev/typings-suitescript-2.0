export interface ConfigSetValueOptions {
    name: string;
    text: (string | string[]);
}

export interface ConfigSetTextOptions {
    name: string;
    text: (string | string[]);
}

export interface ConfigGetOptions {
    name: string;
}

export interface Config {
    names: string;
    type: string;
    /**
     * Description TBA (5/9/2016)
     */
    getField(options: ConfigGetOptions): Object;

    getText(options: ConfigGetOptions): (string | string[]);
    /**
     * Description TBA (5/9/2016)
     */
    getValue(options: ConfigGetOptions): (string | string[] | boolean);
    /**
     * Description TBA (5/9/2016)
     */
    save(): void;
    /**
     * Description TBA (5/9/2016)
     */
    setText(options: ConfigSetTextOptions): Config;
    /**
     * Description TBA (5/9/2016)
     */
    setValue(options: ConfigSetValueOptions): Config;
}

export interface ConfigTypes {
    USER_PREFERENCES: string;
    COMPANY_INFORMATION: string;
    COMPANY_PREFERENCES: string;
    ACCOUNTING_PREFERENCES: string;
    ACCOUNTING_PERIODS: string;
    TAX_PERIODS: string;
    FEATURES: string;
}

export interface LoadOptions {
    /**
     * Use the config.Type enumeration.
     */
    type: string;
}

export interface ConfigModule {
    /**
     * Method used to load a record.Record object that encapsulates the specified NetSuite configuration page.
     */
    load(options: LoadOptions): Config;
    /**
     * Enumeration that holds the string values for supported configuration pages. 
     * This enum is used to set the value of the Record.type property.
     * Note that the Record.type property is read-only.
     */
    Type: ConfigTypes;
}

export default ConfigModule;
