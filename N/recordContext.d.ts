/**
 * Use the N/recordContext Module to get all the available context types of the record, such as LOCALIZATION.
 * The LOCALIZATION context type indicates which country a script is using for execution.
 * You can also use the N/recordContext module to create conditional statements within a script so that the script
 * behaves differently based on the context.
 */

import record = require('./record');

interface GetContextOptions {
    /** The record type. Required if the record is not loaded in your script. */
    recordType?: string;
    /** The record ID. Required if the record is not loaded in your script. */
    recordId?: string;
    /** The record object. Required if the record is loaded in your script. */
    record?: record.Record | record.ClientCurrentRecord;
    /** The available context types. Optional. */
    contextTypes?: ContextType[];
}

/**
 * Contains key-value pairs that represent context types and their values.
 * Each key is the name of the context type, and each value is the record context.
 * Multiple values for a single context type can be returned in an array.
 * NOTE: This is commented out because here the function just returns and object directly.
 */
// interface RecordContext {
//
// }

/**
 * Returns the record context object for a given record.
 * The parameters you specify for this method depend on whether the record is currently loaded in your script:
 * - For records that are not loaded in your script, the record is defined by record type and ID.
 *   In this case, you must use the recordType and recordId parameters to specify the record to obtain the context for. You do not use the record parameter.
 * - For records that are loaded in your script, the record is defined by the record object.
 *   In this case, you must use the record parameter to specify the record to obtain the context for. You do not use the recordType and recordId parameters.
 */
export declare function getContext(options: GetContextOptions): { [contextType: string]: string|string[] }; // The example shows: { "localization": ["CA"] }

export enum ContextType {
    LOCALIZATION
}
