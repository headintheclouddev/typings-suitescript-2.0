/// <reference path="../typings/tsd.d.ts" />

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
    getField: (options:ConfigGetOptions) => Object;
    getText: (options:ConfigGetOptions) => (string|string[]);
    getValue: (options:ConfigGetOptions) => (string|string[]|boolean);
    save: () => void;
    setText: (options:ConfigSetTextOptions) => Config;
    setValue: (options:ConfigSetValueOptions) => Config;
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
    type: ConfigTypes;
}

interface ConfigModule {
    load: (options:LoadOptions) => Config;
    Type: ConfigTypes;
}

declare module N {
    var config:ConfigModule;
}

declare module 'N/config' {
    export = N.config;
}