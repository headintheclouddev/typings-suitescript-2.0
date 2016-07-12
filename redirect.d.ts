import {Search} from './search';

export interface RedirectOptions {
    url: string;
    parameters?: Object;
}

export interface ToRecordOptions {
    id: string;
    type: string;
    isEditMode?: boolean;
    parameters?: Object;
}

export interface ToSavedSearchOptions {
    id: number;
}

export interface ToSearchOptions {
    search: Search;
}

export interface ToSearchResultOptions {
    Search: Search;
}

export interface ToSuiteletOptions {
    scriptId: string;
    deploymentId: string;
    isExternal?: boolean;
    parameters?: Object;
}

export interface ToTaskLinkOptions {
    id: string;
    parameters?: Object;
}

export interface RedirectModule {
    redirect(options: RedirectOptions): void;
    toRecord(options: ToRecordOptions): void;
    toSavedSearch(options: ToSavedSearchOptions): void;
    toSavedSearchResult(options: ToSavedSearchOptions): void;
    toSearch(options: ToSearchOptions): void;
    toSearchResult(options: ToSearchResultOptions): void;
    toSuitelet(options: ToSuiteletOptions): void;
    toTaskLink(options: ToTaskLinkOptions): void;
}

export default RedirectModule;
