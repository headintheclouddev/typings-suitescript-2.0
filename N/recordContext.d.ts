/**
 * Use the N/recordContext Module to get all the available context types of the record, such as LOCALIZATION.
 * The LOCALIZATION context type indicates which country a script is using for execution.
 */

interface GetContextOptions {
    /** The record type. */
    recordType: number; // TODO: Test this. Seems like it should be a string, but docs say number.
    /** The record ID. */
    recordID: string;
    /** The record object. */
    record: string;
    /** The available context types. */
    contextTypes?: string[];
}

/**
 * Method used to change the current user’s NetSuite email address (user name).
 */
export declare function getContext(options: GetContextOptions): { [contextType: string]: string|string[] }; // The example shows: { "localization": ["CA"] }

export enum ContextType {
    LOCALIZATION
}
