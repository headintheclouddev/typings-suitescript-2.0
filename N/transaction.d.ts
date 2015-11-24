/// <reference path="../typings/tsd.d.ts" />

interface VoidOptions {
    id: number|string;
    type: string;
}

interface TransactionModule {
    void(options: VoidOptions): number;
}

declare module N {
    var transaction: TransactionModule;
}

declare module 'N/transaction' {
    export = N.transaction;
}
