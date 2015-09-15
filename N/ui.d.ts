/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var ui:any;
}

declare module 'N/ui' {
    export = N.ui;
}