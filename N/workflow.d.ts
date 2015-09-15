/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var workflow:any;
}

declare module 'N/workflow' {
    export = N.workflow;
}