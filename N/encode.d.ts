/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var encode:any;
}

declare module 'N/encode' {
    export = N.encode;
}