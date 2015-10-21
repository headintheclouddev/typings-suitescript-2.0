/// <reference path="../typings/tsd.d.ts" />

interface RedirectModule {
  
}

declare module N {
    var redirect: any;
}

declare module 'N/render' {
    export = N.redirect;
}