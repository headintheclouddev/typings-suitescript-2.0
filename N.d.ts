/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./N/record.d.ts" />
/// <reference path="./N/search.d.ts" />

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