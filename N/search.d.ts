/// <reference path="../typings/tsd.d.ts" />

interface CreateSearchColumnOptions {
    name: string;
    join?: string;
    summary?: string;
}

interface SearchColumn {
    name: string;
    join?: string;
    summary?: string;
}

interface SearchResultGetValueOptions {
    name: string;
    join?: string;
    summary?: string;
}

interface SearchResult {
    getValue(options: SearchResultGetValueOptions): string;
}

interface SearchInstanceEach {
    promise(callback: (result: SearchResult, index: number) => boolean): Promise<boolean>;
    (callback: (result: SearchResult, index: number) => boolean): void;
}

interface SearchInstance {
    each: SearchInstanceEach;
}

interface SearchTypes {
    TRANSACTION_SEARCH: string;
}

interface Search {
    name: string;
    join: string;
    summary: string;
    run(): SearchInstance;
}

interface SearchCreateOptions {
    type?: string;
}

interface SearchCreateFunction {
    (options: SearchCreateOptions): Search;
    promise(options: SearchCreateOptions): Promise<Search>;
}

declare module N {
    module search {
        var types: SearchTypes;
        var createColumn: (options: CreateSearchColumnOptions) => SearchColumn;
        var create: SearchCreateFunction;
    }
}

declare module "N/search" {
    export = N.search;
}