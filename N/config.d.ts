import {Record} from './record';

interface LoadOptions {
    /**
     * Use the config.Type enumeration.
     */
    type: Type;
}

/**
 * Method used to load a record.Record object that encapsulates the specified NetSuite configuration page.
 */
export declare function load(options: LoadOptions): Record;

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
