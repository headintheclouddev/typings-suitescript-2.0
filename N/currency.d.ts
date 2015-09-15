/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var currency:any;
}

declare module 'N/currency' {
    export = N.currency;
}