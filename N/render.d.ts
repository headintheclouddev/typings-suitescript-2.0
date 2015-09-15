/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var render:any;
}

declare module 'N/render' {
    export = N.render;
}