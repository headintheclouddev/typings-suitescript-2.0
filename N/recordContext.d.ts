/**
 * Use the N/recordContext Module to get all the available context types of the record, such as LOCALIZATION.
 * The LOCALIZATION context type indicates which country a script is using for execution.
 */

interface GetContextOptions {
    /** The record type. Required if the record is not loaded in your script. */
    recordType?: string;
    /** The record ID. Required if the record is not loaded in your script. */
    recordId?: string;
    /** The record object. Required if the record is loaded in your script. */
    record?: string;
    /** The available context types. Optional. */
    contextTypes?: ContextType[];
}

/**
 * Method used to change the current user’s NetSuite email address (user name).
 */
export declare function getContext(options: GetContextOptions): { [contextType: string]: string|string[] }; // The example shows: { "localization": ["CA"] }

export enum ContextType {
    LOCALIZATION
}
