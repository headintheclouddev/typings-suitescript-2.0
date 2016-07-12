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
