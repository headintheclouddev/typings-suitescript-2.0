/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var https:any;
}

declare module 'N/https' {
    export = N.https;
}