/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var email:any;
}

declare module 'N/email' {
    export = N.email;
}