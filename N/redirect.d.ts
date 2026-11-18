import type {Search} from './search';
import type {Type} from './record';

interface RedirectOptions {
    /** The URL of a Suitelet that is available externally. */
    url: string;
    /** Contains additional URL parameters as key/value pairs. */
    parameters?: any;
}

interface ToRecordOptions {
    /** The internal id of the target record. */
    id: string | number;
    /** Type of record. */
    type: string | Type;
    /** Determines whether to return a URL for the record in edit mode or view mode. If set to true, returns the URL to an existing record in edit mode. */
    isEditMode?: boolean;
    /** Contains additional URL parameters as key/value pairs. */
    parameters?: any;
}

interface ToRecordTransformOptions {
    /** The internal ID of the source record. */
    fromId: string | number;
    /** Type of the source record. */
    fromType: string | Type;
    /** Type of the target record. */
    toType: string | Type;
    /** Contains additional parameters as key/value pairs. */
    parameters?: any;
}

interface ToSavedSearchOptions {
    /** Internal ID of the search. */
    id: number;
}

interface ToSearchOptions {
    search: Search;
}

interface ToSearchResultOptions {
    search: Search;
}

interface ToSuiteletOptions {
    /** The script ID for the Suitelet. */
    scriptId: string;
    /** The deployment ID for the Suitelet. */
    deploymentId: string;
    /** The default value is false – indicates an external Suitelet URL. */
    isExternal?: boolean;
    /** Contains additional URL parameters as key/value pairs. */
    parameters?: any;
}

interface ToTaskLinkOptions {
    /** The taskId for a tasklink. */
    id: string;
    /** Contains additional URL parameters as key/value pairs. */
    parameters?: any;
}

/**
 * Method used to set the redirect to the URL of a Suitelet that is available externally (Suitelets set to Available Without Login on the Script Deployment page).
 * @governance none
 * @since 2015.2
 */
export function redirect(options: RedirectOptions): void;
/**
 * Method used to set the redirect URL to a specific NetSuite record.
 * @governance none
 * @since 2015.2
 */
export function toRecord(options: ToRecordOptions): void;
/**
 * Method used to set the redirect URL to a transformed NetSuite record.
 * @throws {SuiteScriptError} INVALID_RCRD_TYPE if the record type specified in the toType parameter is invalid.
 * @throws {SuiteScriptError} INVALID_RCRD_TRANSFRM if transformation between the fromType and toType record types is not allowed.
 * @governance none
 * @since 2020.1
 */
export function toRecordTransform(options: ToRecordTransformOptions): void;
/**
 * Method used to load an existing saved search and redirect to the populated search definition page.
 * @governance 5 units
 * @since 2015.2
 */
export function toSavedSearch(options: ToSavedSearchOptions): void;
/**
 * Method used to redirect a user to a search results page for an existing saved search.
 * @governance 5 units
 * @since 2015.2
 */
export function toSavedSearchResult(options: ToSavedSearchOptions): void;
/**
 * Method used to redirect a user to an ad-hoc search built in SuiteScript.
 * @governance none
 * @since 2015.2
 */
export function toSearch(options: ToSearchOptions): void;
/**
 * Method used to redirect a user to a search results page. For example, the results from an ad-hoc search created with the N/search Module, or a loaded search that you modified but did not save.
 * @governance none
 * @since 2015.2
 */
export function toSearchResult(options: ToSearchResultOptions): void;
/**
 * Method used to redirect the user to a Suitelet.
 * @governance none
 * @since 2015.2
 */
export function toSuitelet(options: ToSuiteletOptions): void;
/**
 * Method used to redirect a user to a tasklink.
 * @governance none
 * @since 2015.2
 */
export function toTaskLink(options: ToTaskLinkOptions): void;
