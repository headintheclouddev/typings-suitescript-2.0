/// <reference path="search.d.ts" />

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
