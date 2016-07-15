interface ConfigSetValueOptions {
    name: string;
    text: (string | string[]);
}

interface ConfigSetTextOptions {
    name: string;
    text: (string | string[]);
}

interface ConfigGetOptions {
    name: string;
}

interface Config {
    names: string;
    type: Type;
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

interface LoadOptions {
    /**
     * Use the config.Type enumeration.
     */
    type: Type;
}

/**
 * Method used to load a record.Record object that encapsulates the specified NetSuite configuration page.
 */
export declare function load(options: LoadOptions): Config;

/**
 * Enumeration that holds the string values for supported configuration pages. 
 * This enum is used to set the value of the Record.type property.
 * Note that the Record.type property is read-only.
 */
export declare enum Type {
    USER_PREFERENCES,
    COMPANY_INFORMATION,
    COMPANY_PREFERENCES,
    ACCOUNTING_PREFERENCES,
    ACCOUNTING_PERIODS,
    TAX_PERIODS,
    FEATURES,
}
