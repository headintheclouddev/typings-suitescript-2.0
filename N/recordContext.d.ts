/**
 * Use the N/recordContext Module to get all the available context types of the record, such as LOCALIZATION.
 * The LOCALIZATION context type indicates which country a script is using for execution.
 * You can also use the N/recordContext module to create conditional statements within a script so that the script
 * behaves differently based on the context.
 */

import type {ClientCurrentRecord, Record, Type} from './record';

interface GetContextOptions {
    /** The record type. Required if the record is not loaded in your script. */
    recordType?: Type | string;
    /** The internal ID of the record. Required if the record is not loaded in your script. */
    recordId?: string;
    /** The record object. Required if the record is loaded in your script. Mutually exclusive with recordType and recordId. */
    record?: Record | ClientCurrentRecord;
    /** The context types to retrieve. Use the recordContext.ContextType enum to set the value for this parameter. Optional. */
    contextTypes?: ContextType[];
}

/**
 * Contains key-value pairs that represent context types and their values.
 * Each key is the name of the context type, and each value is the record context.
 * Multiple values for a single context type can be returned in an array, for example `{ "localization": ["CA"] }`.
 * Values for the LOCALIZATION context type are ISO 3166-2 country codes.
 * @since 2020.2
 */
export interface RecordContext {
    [contextType: string]: string | string[];
}

/**
 * Returns the record context object for a given record.
 * The parameters you specify for this method depend on whether the record is currently loaded in your script:
 * - For records that are not loaded in your script, the record is defined by record type and ID.
 *   In this case, you must use the recordType and recordId parameters to specify the record to obtain the context for. You do not use the record parameter.
 * - For records that are loaded in your script, the record is defined by the record object.
 *   In this case, you must use the record parameter to specify the record to obtain the context for. You do not use the recordType and recordId parameters.
 *
 * @throws {SuiteScriptError} MUTUALY_EXCLUSIVE_ARGUMENT if the record is present alongside a record ID or record type
 * @throws {SuiteScriptError} MISSING_REQD_ARGUMENT if any of the record ID or record type parameter is missing
 * @throws {SuiteScriptError} SSS_INVALID_TYPE_ARG if the parameter type is wrong
 * @throws {SuiteScriptError} UNKNOWN_CONTEXT_TYPE if the context type selection is unknown
 * @throws {SuiteScriptError} INVALID_UNSUPRTD_RCRD_TYP if the record type selection is invalid or not supported
 * @governance 10 units
 * @since 2020.2
 */
export declare function getContext(options: GetContextOptions): RecordContext;

/**
 * Holds the values for the context type.
 * @since 2020.2
 */
export enum ContextType {
    /** The localization context. Values are returned as ISO 3166-2 country codes. */
    LOCALIZATION
}
