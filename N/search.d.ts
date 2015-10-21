/// <reference path="../typings/tsd.d.ts" />

interface SearchOperatorValue {}

interface SearchOperator {
    AFTER: SearchOperatorValue;
    ALLOF: SearchOperatorValue;
    ANY: SearchOperatorValue;
    ANYOF: SearchOperatorValue;
    BEFORE: SearchOperatorValue;
    BETWEEN: SearchOperatorValue;
    CONTAINS: SearchOperatorValue;
    DOESNOTCONTAIN: SearchOperatorValue;
    DOESNOTSTARTWITH: SearchOperatorValue;
    EQUALTO: SearchOperatorValue;
    GREATERTHAN: SearchOperatorValue;
    GREATERTHANOREQUALTO: SearchOperatorValue;
    HASKEYWORDS: SearchOperatorValue;
    IS: SearchOperatorValue;
    ISEMPTY: SearchOperatorValue;
    ISNOT: SearchOperatorValue;
    ISNOTEMPTY: SearchOperatorValue;
    LESSTHAN: SearchOperatorValue;
    LESSTHANOREQUALTO: SearchOperatorValue;
    NONEOF: SearchOperatorValue;
    NOTAFTER: SearchOperatorValue;
    NOTALLOF: SearchOperatorValue;
    NOTBEFORE: SearchOperatorValue;
    NOTBETWEEN: SearchOperatorValue;
    NOTEQUALTO: SearchOperatorValue;
    NOTGREATERTHAN: SearchOperatorValue;
    NOTGREATERTHANOREQUALTO: SearchOperatorValue;
    NOTLESSTHAN: SearchOperatorValue;
    NOTLESSTHANOREQUALTO: SearchOperatorValue;
    NOTON: SearchOperatorValue;
    NOTONORAFTER: SearchOperatorValue;
    NOTONORBEFORE: SearchOperatorValue;
    NOTWITHIN: SearchOperatorValue;
    ON: SearchOperatorValue;
    ONORAFTER: SearchOperatorValue;
    ONORBEFORE: SearchOperatorValue;
    STARTSWITH: SearchOperatorValue;
    WITHIN: SearchOperatorValue;
}

interface SearchFilter {
    name: string;
    join: string;
    operator: SearchOperatorValue;
    summary: SearchSummaryValue;
    formula: string;
}

interface SearchSummaryValue {}

interface SearchSummary {
    GROUP: SearchSummaryValue;
    COUNT: SearchSummaryValue;
    SUM: SearchSummaryValue;
    AVG: SearchSummaryValue;
    MIN: SearchSummaryValue;
    MAX: SearchSummaryValue;
}

interface SearchColumnSetWhenOrderedByOptions {
    name: string;
    join: string;
}

interface SearchColumn {
    setWhenOrderedBy?: (SearchColumnSetWhenOrderedByOptions) => SearchColumn;
    name: string;
    join?: string;
    summary?: string;
    formula?: string;
    label?: string;
    function?: string
    sort?: string; // SORT enum: ASC/DESC/NONE
}

interface SearchResultGetValueTextOptions {
    name: string;
    join: string;
    summary?: SearchSummaryValue;
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
    operator: SearchOperatorValue;
    values?: (string|Date|number|string[]);
    formula?: string;
    summary?: SearchSummaryValue;
}

interface CreateSearchColumnOptions {
    name: string;
    join?: string;
    summary?: string; // todo: use enum
    formula?: string;
    function?: string;
    label?: string;
    sort?: string; // todo: use enum (ASC/DESC/NONE)
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