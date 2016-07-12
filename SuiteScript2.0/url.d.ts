/// <reference path="../SuiteScript2.0-Globals/index.d.ts" />

interface URLModule {
    format: (options: formatOptions) => string;
    resolveRecord: (options: resolveRecordOptions) => string;
    resolveScript: (options: resolveScriptOptions) => string;
    resolveTaskLink: (options: resolveTaskLinkOptions) => string;
}

declare var _: URLModule;
export = _;
