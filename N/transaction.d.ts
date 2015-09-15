/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var transaction:any;
}

declare module 'N/transaction' {
    export = N.transaction;
}