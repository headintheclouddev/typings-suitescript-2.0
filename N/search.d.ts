/// <reference path="../typings/tsd.d.ts" />

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
    name: string;
    join: string;
    operator: SearchOperator;
    summary: SearchSummary;
    formula: string;
}

interface SearchSummary {
    GROUP: string;
    COUNT: string;
    SUM: string;
    AVG: string;
    MIN: string;
    MAX: string;
}

interface SearchColumnSetWhenOrderedByOptions {
    name: string;
    join: string;
}

interface SearchColumn {
    setWhenOrderedBy: (SearchColumnSetWhenOrderedByOptions) => SearchColumn;
    name: string;
    join: string;
    summary: SearchSummary;
    formula: string;
    label: string;
    function: string
    sort: boolean;
}

interface SearchResultGetValueTextOptions {
    name: string;
    join: string;
    summary?: SearchSummary;
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

interface SearchResultSetGetRangeOptions {
    start: number;
    end: number;
}

interface SearchResultSetGetRangeFunction {
    promise(options:SearchResultSetGetRangeOptions): Promise<SearchResult[]>;
    (options:SearchResultSetGetRangeOptions): SearchResult[];
}

interface SearchResultSetEachFunction {
    promise(callback: (result: SearchResult, index: number) => boolean): Promise<boolean>;
    (callback: (result: SearchResult, index: number) => boolean): void;
}

interface SearchResultSet {
    each: SearchResultSetEachFunction;
    getRange: SearchResultSetGetRangeFunction;
    columns: SearchColumn[];
}

interface Search {
    searchType: string;
    searchId: number;
    filters: SearchFilter[];
    filterExpression: Object[];
    columns: (SearchColumn[]|string[]);
    title: string;
    id: string;
    isPublic: boolean;
    save: () => number;
    run: () => SearchResultSet;
}

interface CreateSearchFilterOptions {
    name: string;
    join?: string;
    operator: SearchOperator;
    values?: (string|Date|number|string[]);
    formula?: string;
    summary?: SearchSummary;
}

interface CreateSearchColumnOptions {
    name: string;
    join?: string;
    summary?: SearchSummary;
    formula?: string;
    function?: string;
    label?: string;
    sort?: boolean;
}

interface SearchLookupFieldsOptions {
    type: string;
    id: string;
    columns: (string|string[]);
}

interface SearchLookupFieldsFunction {
    promise(options:SearchLookupFieldsOptions): Promise<Object>;
    (options:SearchLookupFieldsOptions): Object;
}

interface SearchGlobalOptions {
    keywords: string;
}

interface SearchGlobalFunction {
    promise(options:SearchGlobalOptions): Promise<SearchResult[]>;
    (options:SearchGlobalOptions): SearchResult[];
}

interface SearchDuplicatesOptions {
    type: string;
    fields?: string[];
    id?: number;
}

interface SearchDuplicatesFunction {
    promise(options:SearchDuplicatesOptions): Promise<SearchResult[]>;
    (options:SearchDuplicatesOptions): SearchResult[];
}

interface SearchDeleteOptions {
    id: string;
}

interface SearchDeleteFunction {
    promise(options:SearchDeleteOptions): Promise<void>;
    (options:SearchDeleteOptions): void;
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
    filters?: (SearchFilter[]|Object[]);
    columns?: (SearchColumn[]|string[]);
    title?: string;
    id?: string;
}

interface SearchCreateFunction {
    (options: SearchCreateOptions): Search;
    promise(options: SearchCreateOptions): Promise<Search>;
}

interface SearchModule {
    create: SearchCreateFunction;
    load: SearchLoadFunction;
    delete: SearchDeleteFunction;
    duplicates: SearchDuplicatesFunction;
    global: SearchGlobalFunction;
    lookupFields: SearchLookupFieldsFunction;
    createColumn: (options: CreateSearchColumnOptions) => SearchColumn;
    createFilter: (options: CreateSearchFilterOptions) => SearchFilter;
    Operator: SearchOperator;
    Summary: SearchSummary;
}

declare module N {
    var search:SearchModule;
}

declare module "N/search" {
    export = N.search;
}