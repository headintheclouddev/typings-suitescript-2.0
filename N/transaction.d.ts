/// <reference path="../typings/index.d.ts" />

interface VoidOptions {
    id: number|string;
    type: string;
}

interface TransactionVoidFunction {
    (options: VoidOptions): number;
    promise(options: VoidOptions): Promise<number>;
}

interface TransactionModule {
    void: TransactionVoidFunction;
}

declare module N {
    var transaction: TransactionModule;
}

declare module 'N/transaction' {
    export = N.transaction;
}
