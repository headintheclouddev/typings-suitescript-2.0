/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var http:any;
}

declare module 'N/http' {
    export = N.http;
}