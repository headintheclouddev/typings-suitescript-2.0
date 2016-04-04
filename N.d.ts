/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./N/auth.d.ts" />
/// <reference path="./N/config.d.ts" />
/// <reference path="./N/crypto.d.ts" />
/// <reference path="./N/currency.d.ts" />
/// <reference path="./N/email.d.ts" />
/// <reference path="./N/encode.d.ts" />
/// <reference path="./N/error.d.ts" />
/// <reference path="./N/file.d.ts" />
/// <reference path="./N/format.d.ts" />
/// <reference path="./N/http.d.ts" />
/// <reference path="./N/https.d.ts" />
/// <reference path="./N/log.d.ts" />
/// <reference path="./N/plugin.d.ts" />
/// <reference path="./N/portlet.d.ts" />
/// <reference path="./N/record.d.ts" />
/// <reference path="./N/redirect.d.ts" />
/// <reference path="./N/render.d.ts" />
/// <reference path="./N/runtime.d.ts" />
/// <reference path="./N/search.d.ts" />
/// <reference path="./N/sso.d.ts" />
/// <reference path="./N/task.d.ts" />
/// <reference path="./N/transaction.d.ts" />
/// <reference path="./N/ui/serverWidget.d.ts" />
/// <reference path="./N/ui/dialog.d.ts" />
/// <reference path="./N/ui/message.d.ts" />
/// <reference path="./N/url.d.ts" />
/// <reference path="./N/util.d.ts" />
/// <reference path="./N/workflow.d.ts" />
/// <reference path="./N/xml.d.ts" />

/// <reference path="./scriptTypes/scriptEntry.d.ts" />

declare module 'N' {
    export = N;
}

interface LogFunction {
    (title: string, details: string);
}

interface LogInterface {
    debug: LogFunction;
    audit: LogFunction;
    error: LogFunction;
    emergency: LogFunction;
}

declare var log : LogInterface;

interface UtilInterface {
    each: any;
    extend: any;
    isArray: (toTest:any) => boolean;
    isBoolean: (toTest:any) => boolean;
    isDate: (toTest:any) => boolean;
    isFunction: (toTest:any) => boolean;
    isNumber: (toTest:any) => boolean;
    isObject: (toTest:any) => boolean;
    isRegExp: (toTest:any) => boolean;
    isString: (toTest:any) => boolean;
    trim: (toTrim:string) => string;
}

declare var util : UtilInterface;
