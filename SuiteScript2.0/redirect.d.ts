/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface RedirectModule {
    redirect(options: RedirectOptions): void;
    toRecord(options: ToRecordOptions): void;
    toSavedSearch(options: ToSavedSearchOptions): void;
    toSavedSearchResult(options: ToSavedSearchOptions): void;
    toSearch(options: ToSearchOptions): void;
    toSearchResult(options: ToSearchResultOptions): void;
    toSuitelet(options: ToSuiteletOptions): void;
    toTaskLink(options: ToTaskLinkOptions): void;
}

declare var _: RedirectModule;
export = _;
