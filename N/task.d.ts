/// <reference path="../typings/tsd.d.ts" />

declare module N {
    var task:any;
}

declare module 'N/task' {
    export = N.task;
}