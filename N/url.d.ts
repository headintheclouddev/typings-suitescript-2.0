/// <reference path="../typings/index.d.ts" />

interface formatOptions {
  domain: string;
  parameters: Object;
}

interface resolveRecordOptions {
  recordType: string;
  recordId: string;
  isEditMode?: boolean;
  params?: Object;
}

interface resolveScriptOptions {
  scriptId: string;
  deploymentId: string;
  returnExternalUrl?: boolean;
  params?: Object;
}

interface resolveTaskLinkOptions {
  id: string;
  parameters?: Object;
}

interface URLModule {
  format: (options: formatOptions) => string;
  resolveRecord: (options: resolveRecordOptions) => string;
  resolveScript: (options: resolveScriptOptions) => string;
  resolveTaskLink: (options: resolveTaskLinkOptions) => string;
}

declare module N {
    var url: URLModule;
}

declare module 'N/url' {
    export = N.url;
}
