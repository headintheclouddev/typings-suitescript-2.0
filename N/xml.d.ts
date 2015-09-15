/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var xml:any;
}

declare module 'N/xml' {
    export = N.xml;
}