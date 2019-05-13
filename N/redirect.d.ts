import {Search} from './search';

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
    type: string;
    /** Determines whether to return a URL for the record in edit mode or view mode. If set to true, returns the URL to an existing record in edit mode. */
    isEditMode?: boolean;
    /** Contains additional URL parameters as key/value pairs. */
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
    Search: Search;
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

/** Method used to set the redirect to the URL of a Suitelet that is available externally (Suitelets set to Available Without Login on the Script Deployment page). */
export function redirect(options: RedirectOptions): void;
/** Method used to set the redirect URL to a specific NetSuite record. */
export function toRecord(options: ToRecordOptions): void;
/** Method used to load an existing saved search and redirect to the populated search definition page. */
export function toSavedSearch(options: ToSavedSearchOptions): void;
/** Method used to redirect a user to a search results page for an existing saved search. */
export function toSavedSearchResult(options: ToSavedSearchOptions): void;
/** Method used to redirect a user to an ad-hoc search built in SuiteScript. */
export function toSearch(options: ToSearchOptions): void;
/** Method used to redirect a user to a search results page. For example, the results from an ad-hoc search created with the N/search Module, or a loaded search that you modified but did not save. */
export function toSearchResult(options: ToSearchResultOptions): void;
/** Method used to redirect the user to a Suitelet. */
export function toSuitelet(options: ToSuiteletOptions): void;
/** Method used to redirect a user to a tasklink. */
export function toTaskLink(options: ToTaskLinkOptions): void;
