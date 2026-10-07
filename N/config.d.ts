/**
 * Use the N/config module to load NetSuite configuration objects (preference pages).
 *
 * Supported script types: Server scripts.
 */

import type {Record} from './record';

interface LoadOptions {
    /**
     * The NetSuite configuration page you want to access. Use the config.Type enum to set the value.
     */
    type: Type;
    /**
     * -optional- Determines whether the record is loaded in dynamic mode.
     * If set to true, the record is loaded in dynamic mode. If set to false, the record is loaded in standard mode.
     */
    isDynamic?: boolean;
}

/**
 * Method used to load a record.Record object that encapsulates the specified NetSuite configuration page.
 * After the configuration page loads, all preference names and IDs are available to get or set
 * (using Record.getField, getFields, getText, getValue, setText, and setValue).
 *
 * Supported script types: Server scripts.
 * @governance 10 units
 * @throws {SuiteScriptError} INVALID_RCRD_TYPE if the type argument is invalid or missing.
 * @since 2015.2
 */
export declare function load(options: LoadOptions): Record;

/**
 * Enumeration that holds the string values for supported configuration pages.
 * Use this enum to set the value of the options.type parameter of config.load(options).
 * @since 2015.2
 */
export declare enum Type {
    /** Set Preferences page (Home > Set Preferences). */
    USER_PREFERENCES,
    /** Company Information page (Setup > Company > Company Information). */
    COMPANY_INFORMATION,
    /** General Preferences page (Setup > Company > General Preferences). */
    COMPANY_PREFERENCES,
    /** Accounting Preferences page (Setup > Accounting > Accounting Preferences). */
    ACCOUNTING_PREFERENCES,
    /** Accounting Periods page (Setup > Accounting > Manage Accounting Periods). */
    ACCOUNTING_PERIODS,
    /** Tax Periods page (Setup > Accounting > Manage Tax Periods). */
    TAX_PERIODS,
    /** Enable Features page (Setup > Company > Enable Features). */
    FEATURES,
    /** See Posting Time Transactions. */
    TIME_POST,
    /** See Posting Time Transactions. */
    TIME_VOID,
    /** Manufacturing Preferences page (Home > Manufacturing > Manufacturing Preferences). */
    MANUFACTURING_PREFERENCES
}
