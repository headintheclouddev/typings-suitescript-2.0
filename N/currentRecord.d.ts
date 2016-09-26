/* 2016.1: This is an undocumented module.  Use this when you have a UI button in a 
   client View mode, as these are the only attributes of the current record
   that are available in View context.
   If you are working in create/edit mode, use the ClientCurrentRecord object
   defined in scriptTypes/scriptEntry.d.ts.  It's more similar to to a full
   Record object. */
export var id: string;
export var type: string;

// ^ Remove stuff above here when 2016.2 goes live!

/// <reference path="typings/index.d.ts" />

import {ClientCurrentRecord} from './record';

interface GetCurrentRecordFunction {
    (): ClientCurrentRecord;
    promise(): Promise<ClientCurrentRecord>;
}

export var get: GetCurrentRecordFunction;
