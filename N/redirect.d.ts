import type {Search} from './search';
import type {Type} from './record';

/** Additional URL parameters as key-value pairs. Parameter values cannot be arrays; use JSON.stringify/JSON.parse to pass arrays. */
type RedirectParameters = Record<string, unknown>;

interface RedirectOptions {
    /** The URL of a Suitelet that is available externally. Available without Login must be enabled on the Script Deployment page for the Suitelet. */
    url: string;
    /** Contains additional URL parameters as key/value pairs. Parameters cannot be arrays. */
    parameters?: RedirectParameters;
}

interface ToRecordOptions {
    /** The internal id of the target record. */
    id: string | number;
    /** Type of record. */
    type: string | Type;
    /** Determines whether to return a URL for the record in edit mode or view mode. If set to true, returns the URL to an existing record in edit mode. The default value is false. */
    isEditMode?: boolean;
    /** Contains additional URL parameters as key/value pairs. */
    parameters?: RedirectParameters;
}

interface ToRecordTransformOptions {
    /** The internal ID of the source record. */
    fromId: string | number;
    /** Type of the source record. */
    fromType: string | Type;
    /** Type of the target record. */
    toType: string | Type;
    /** Contains additional parameters as key/value pairs. */
    parameters?: RedirectParameters;
}

interface ToSavedSearchOptions {
    /** Internal ID of the search (for example 55 or 234), not a script ID like customsearch_mysearch. */
    id: number;
}

interface ToSearchOptions {
    /** The search to be redirected to. */
    search: Search;
}

interface ToSearchResultOptions {
    /** The search result to be redirected to. */
    search: Search;
}

interface ToSuiteletOptions {
    /** The script ID for the Suitelet. */
    scriptId: string;
    /** The deployment ID for the Suitelet. */
    deploymentId: string;
    /** The default value is false – indicates an external Suitelet URL. */
    isExternal?: boolean;
    /** Contains additional URL parameters as key/value pairs. Parameters cannot be arrays. */
    parameters?: RedirectParameters;
}

interface ToTaskLinkOptions {
    /** The taskId for a tasklink. Each page in NetSuite has a unique task ID associated with it for a specific record type. */
    id: string;
    /** Contains additional URL parameters as key/value pairs. */
    parameters?: RedirectParameters;
}

/**
 * Method used to set the redirect to the URL of a Suitelet that is available externally (Suitelets set to Available Without Login on the Script Deployment page).
 *
 * Supported script types: Suitelets, beforeLoad user events, and synchronous afterSubmit user events. Not supported in beforeSubmit or asynchronous afterSubmit user events; only supported when triggered from the UI.
 * @governance none
 * @since 2015.2
 */
export function redirect(options: RedirectOptions): void;
/**
 * Method used to set the redirect URL to a specific NetSuite record. The record must already exist in NetSuite.
 *
 * Supported script types: Suitelets, beforeLoad user events, and synchronous afterSubmit user events. Not supported in beforeSubmit or asynchronous afterSubmit user events; only supported when triggered from the UI.
 * @governance none
 * @since 2015.2
 */
export function toRecord(options: ToRecordOptions): void;
/**
 * Method used to transform a record to a standard or custom transaction instance and redirect to it. The new transaction instance opens in edit mode.
 *
 * Supported script types: Workflow action scripts. (Oracle's N/redirect members table says workflow action scripts; the method page says server scripts.)
 * @throws {SuiteScriptError} INVALID_RCRD_TYPE if the record type specified in the toType parameter is invalid.
 * @throws {SuiteScriptError} INVALID_RCRD_TRANSFRM if transformation between the fromType and toType record types is not allowed.
 * @governance none
 * @since 2020.1
 */
export function toRecordTransform(options: ToRecordTransformOptions): void;
/**
 * Method used to load an existing saved search and redirect to the populated search definition page.
 *
 * Supported script types: afterSubmit user events.
 * @governance 5 units
 * @since 2015.2
 */
export function toSavedSearch(options: ToSavedSearchOptions): void;
/**
 * Method used to redirect a user to a search results page for an existing saved search.
 *
 * Supported script types: afterSubmit user events.
 * @governance 5 units
 * @since 2015.2
 */
export function toSavedSearchResult(options: ToSavedSearchOptions): void;
/**
 * Method used to redirect a user to an ad-hoc search built in SuiteScript.
 *
 * Supported script types: afterSubmit user events.
 * @governance none
 * @since 2015.2
 */
export function toSearch(options: ToSearchOptions): void;
/**
 * Method used to redirect a user to a search results page. For example, the results from an ad-hoc search created with the N/search Module, or a loaded search that you modified but did not save.
 *
 * Supported script types: afterSubmit user events.
 * @governance none
 * @since 2015.2
 */
export function toSearchResult(options: ToSearchResultOptions): void;
/**
 * Method used to redirect the user to a Suitelet. The redirect happens after the script finishes.
 *
 * Supported script types: Suitelets, beforeLoad user events, and synchronous afterSubmit user events. Not supported in beforeSubmit or asynchronous afterSubmit user events; only supported when triggered from the UI.
 * @governance none
 * @since 2015.2
 */
export function toSuitelet(options: ToSuiteletOptions): void;
/**
 * Method used to redirect a user to a tasklink.
 *
 * Supported script types: Suitelets, beforeLoad user events, and synchronous afterSubmit user events. Not supported in beforeSubmit or asynchronous afterSubmit user events; only supported when triggered from the UI.
 * @governance none
 * @since 2015.2
 */
export function toTaskLink(options: ToTaskLinkOptions): void;
