/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

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
