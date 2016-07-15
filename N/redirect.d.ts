import {Search} from './search';

interface RedirectOptions {
    url: string;
    parameters?: Object;
}

interface ToRecordOptions {
    id: string;
    type: string;
    isEditMode?: boolean;
    parameters?: Object;
}

interface ToSavedSearchOptions {
    id: number;
}

interface ToSearchOptions {
    search: Search;
}

interface ToSearchResultOptions {
    Search: Search;
}

interface ToSuiteletOptions {
    scriptId: string;
    deploymentId: string;
    isExternal?: boolean;
    parameters?: Object;
}

interface ToTaskLinkOptions {
    id: string;
    parameters?: Object;
}

export function redirect(options: RedirectOptions): void;
export function toRecord(options: ToRecordOptions): void;
export function toSavedSearch(options: ToSavedSearchOptions): void;
export function toSavedSearchResult(options: ToSavedSearchOptions): void;
export function toSearch(options: ToSearchOptions): void;
export function toSearchResult(options: ToSearchResultOptions): void;
export function toSuitelet(options: ToSuiteletOptions): void;
export function toTaskLink(options: ToTaskLinkOptions): void;
