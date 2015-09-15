/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var error:any;
}

declare module 'N/error' {
    export = N.error;
}