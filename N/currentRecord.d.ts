import type {ClientCurrentRecord} from './record';

interface GetCurrentRecordFunction {
    /**
     * @throws {SuiteScriptError} CANNOT_CREATE_RECORD_INSTANCE if the current record page is not scriptable or an error occurred when creating the record object
     * @governance none
     * @since 2016.2
     */
    (): ClientCurrentRecord;
    /**
     * @throws {SuiteScriptError} CANNOT_CREATE_RECORD_INSTANCE if the current record page is not scriptable or an error occurred when creating the record instance
     * @governance none
     * @since 2016.2
     */
    promise(): Promise<ClientCurrentRecord>;
}

/**
 * @throws {SuiteScriptError} CANNOT_CREATE_RECORD_INSTANCE if the current record page is not scriptable or an error occurred when creating the record object
 * @governance none
 * @since 2016.2
 */
export const get: GetCurrentRecordFunction;
