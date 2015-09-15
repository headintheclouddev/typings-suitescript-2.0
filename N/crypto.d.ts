/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var crypto:any;
}

declare module 'N/crypto' {
    export = N.crypto;
}