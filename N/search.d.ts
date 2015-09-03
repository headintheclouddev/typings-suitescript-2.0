/// <reference path="../typings/tsd.d.ts" />

interface CreateSearchFilterOptions {
    name: string;
    join?: string;
    operator: string;
    values?: any;
    formula?: string;
    summary?: string;
}

interface SearchOperator {
    AFTER: string;
    ALLOF: string;
    ANY: string;
    ANYOF: string;
    BEFORE: string;
    BETWEEN: string;
    CONTAINS: string;
    DOESNOTCONTAIN: string;
    DOESNOTSTARTWITH: string;
    EQUALTO: string;
    GREATERTHAN: string;
    GREATERTHANOREQUALTO: string;
    HASKEYWORDS: string;
    IS: string;
    ISEMPTY: string;
    ISNOT: string;
    ISNOTEMPTY: string;
    LESSTHAN: string;
    LESSTHANOREQUALTO: string;
    NONEOF: string;
    NOTAFTER: string;
    NOTALLOF: string;
    NOTBEFORE: string;
    NOTBETWEEN: string;
    NOTEQUALTO: string;
    NOTGREATERTHAN: string;
    NOTGREATERTHANOREQUALTO: string;
    NOTLESSTHAN: string;
    NOTLESSTHANOREQUALTO: string;
    NOTON: string;
    NOTONORAFTER: string;
    NOTONORBEFORE: string;
    NOTWITHIN: string;
    ON: string;
    ONORAFTER: string;
    ONORBEFORE: string;
    STARTSWITH: string;
    WITHIN: string;
}

interface SearchFilter {
}

interface SearchSummary {
    GROUP: string;
    COUNT: string;
    SUM: string;
    AVG: string;
    MIN: string;
    MAX: string;
}

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

interface SearchResultGetValueTextOptions {
    name: string;
    join?: string;
    summary?: string;
}

interface SearchResult {
    getValue(options: SearchResultGetValueTextOptions): string;
    getValue(SearchColumn): string;
    getText(options: SearchResultGetValueTextOptions): string;
    getText(SearchColumn): string;
    recordType: string;
    id: string;
    columns: SearchColumn[];
}

interface SearchResultSetGetResults {
    promise(startAt:number, results:number): Promise<SearchResult[]>;
    (startAt:number, results:number): SearchResult[];
}

interface SearchResultSetEach {
    promise(callback: (result: SearchResult, index: number) => boolean): Promise<boolean>;
    (callback: (result: SearchResult, index: number) => boolean): void;
}

interface SearchResultSet {
    each: SearchResultSetEach;
    getResults: SearchResultSetGetResults;
}

interface Search {
    name: string;
    join: string;
    summary: string;
    run(): SearchResultSet;
}

interface SearchLoadOptions {
    id: string;
}

interface SearchLoadFunction {
    promise(options:SearchLoadOptions): Promise<Search>;
    (options:SearchLoadOptions): Search;
}

interface SearchCreateOptions {
    type: string;
    filters?: any;
    columns?: any;
    title?: string;
    id?: string;
}

interface SearchCreateFunction {
    (options: SearchCreateOptions): Search;
    promise(options: SearchCreateOptions): Promise<Search>;
}

declare module N {
    module search {
        var create: SearchCreateFunction;
        var load: SearchLoadFunction;
        var createColumn: (options: CreateSearchColumnOptions) => SearchColumn;
        var createFilter: (options: CreateSearchFilterOptions) => SearchFilter;
        var Operator: SearchOperator;
        var Summary: SearchSummary;
    }
}

declare module "N/search" {
    export = N.search;
}