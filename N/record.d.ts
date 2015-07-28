/// <reference path="../typings/tsd.d.ts" />

interface RecordSaveFunction {
    (): void;
    promise(): Promise<void>;
}

interface Record {
    setValue(field: string, value: string): void;
    save: RecordSaveFunction;
}

interface RecordTypes {
    SALES_ORDER: string;
}

interface RecordCreateOptions {
    type: string;
}

interface RecordCreateFunction {
    (options: RecordCreateOptions): Record;
    promise(options: RecordCreateOptions): Promise<Record>;
}

declare module N {
    module record {
        var create: RecordCreateFunction;
        var types: RecordTypes;
    }
}

declare module 'N/record' {
    export = N.record;
}