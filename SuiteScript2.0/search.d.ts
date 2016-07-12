/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

export interface SearchModule {
    create: SearchCreateFunction;
    load: SearchLoadFunction;
    delete: SearchDeleteFunction;
    duplicates: SearchDuplicatesFunction;
    global: SearchGlobalFunction;
    lookupFields: SearchLookupFieldsFunction;
    createColumn(options: CreateSearchColumnOptions): SearchColumn;
    createFilter(options: CreateSearchFilterOptions): SearchFilter;
    Operator: SearchOperator;
    Summary: SearchSummary;
    Sort: SearchSort;
    Type: SearchTypes;
}

export default SearchModule;
