/// <reference path="../typings/tsd.d.ts" />

interface SsoModule {
  
}

declare module N {
    var sso: any;
}

declare module 'N/render' {
    export = N.sso;
}