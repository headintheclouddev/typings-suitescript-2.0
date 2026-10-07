/**
 * Use the N/currentRecord module to access the record that is active in the current client-side context.
 * Supported script types: Client scripts.
 */

import type {ClientCurrentRecord} from './record';

interface GetCurrentRecordFunction {
    /**
     * Retrieves a record object that represents the current record.
     * In an entry point client script, the current record is also available as context.currentRecord.
     *
     * @throws {SuiteScriptError} CANNOT_CREATE_RECORD_INSTANCE if the current record page is not scriptable or an error occurred when creating the record object
     * @governance none
     * @since 2016.2
     */
    (): ClientCurrentRecord;
    /**
     * Retrieves a promise for an object that represents the current record.
     *
     * @throws {SuiteScriptError} CANNOT_CREATE_RECORD_INSTANCE if the current record page is not scriptable or an error occurred when creating the record instance
     * @governance none
     * @since 2016.2
     */
    promise(): Promise<ClientCurrentRecord>;
}

/**
 * Retrieves a record object that represents the current record.
 * Supported script types: Client scripts.
 *
 * @throws {SuiteScriptError} CANNOT_CREATE_RECORD_INSTANCE if the current record page is not scriptable or an error occurred when creating the record object
 * @governance none
 * @since 2016.2
 */
export const get: GetCurrentRecordFunction;
