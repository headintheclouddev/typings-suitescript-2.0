/* This is an undocumented module.  Use this when you have a UI button in a 
   client View mode, as these are the only attributes of the current record
   that are available in View context.
   If you are working in create/edit mode, use the ClientCurrentRecord object
   defined in scriptTypes/scriptEntry.d.ts.  It's more similar to to a full
   Record object. */
export interface CurrentRecordModule {
    id: string;
    type: string;
}

export default CurrentRecordModule;