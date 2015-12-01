/// <reference path="../N/http.d.ts" />
/// <reference path="../N/record.d.ts" />
/// <reference path="../N/ui.d.ts" />

interface NS2_Client_FieldChangedContext {
	currentRecord: Record;
	sublistId: string;
	fieldId: string;
	lineNum: string;
	columnNum: string;
}

interface NS2_Client_FieldChanged {
    (scriptContext?: NS2_Client_FieldChangedContext): void;
}

interface NS2_Client_LineInitContext {
	currentRecord: Record;
	sublistId: string;
}

interface NS2_Client_LineInit {
  (scriptContext?: NS2_Client_LineInitContext): void;
}

interface NS2_Client_PageInitContext {
	currentRecord: Record;
	mode: string;
}

interface NS2_Client_PageInit {
    (scriptContext?: NS2_Client_PageInitContext): void;
}

interface NS2_Client_PostSourceContext {
    currentRecord: Record;
    sublistId: string;
    fieldId: string;
}

interface NS2_Client_PostSource {
    (scriptContext?: NS2_Client_PostSourceContext): void;
}

interface NS2_Client_SaveRecord {
    (scriptContext?: NS2_Client_SaveRecordContext): boolean;
}

interface NS2_Client_SaveRecordContext {
    currentRecord: Record;
}

interface NS2_Client_SublistChangedContext {
    currentRecord: Record;
    sublistId: string;
}

interface NS2_Client_SublistChanged {
    (scriptContext?: NS2_Client_SublistChangedContext): void;
}

interface NS2_Client_ValidateDeleteContext {
    currentRecord: Record;
    sublistId: string;
}

interface NS2_Client_ValidateDelete {
    (scriptContext?: NS2_Client_ValidateDeleteContext): boolean;
}

interface NS2_Client_ValidateFieldContext {
    currentRecord: Record;
    sublistId: string;
    fieldId: string;
    lineNum?: string;
    columnNum?: string;
}

interface NS2_Client_ValidateField {
    (scriptContext?: NS2_Client_ValidateFieldContext): boolean;
}

interface NS2_Client_ValidateInsertContext {
     currentRecord: Record;
    sublistId: string;
}

interface NS2_Client_ValidateInsert {
    (scriptContext?: NS2_Client_ValidateInsertContext): boolean;
}

interface NS2_Client_ValidateLineContext {
     currentRecord: Record;
     sublistId: string;
}

interface NS2_Client_ValidateLine {
     (scriptContext?: NS2_Client_ValidateLineContext): boolean;
}

interface NS2_UE_BeforeLoadContext {
     newRecord: Record;
     type: string;
     form: UIForm;
     UserEventTypes: NS2_UserEventTypes;
}

interface NS2_UE_BeforeSubmitContext {
    newRecord: Record;
    oldRecord: Record;
    type: string;
    UserEventTypes: NS2_UserEventTypes;
}

interface NS2_UE_AfterSubmitContext {
    newRecord: Record;
     oldRecord: Record;
    type: string;
    UserEventTypes: NS2_UserEventTypes;
}

interface NS2_UserEventTypes {
    EDIT: string;
    CREATE: string;
    DELETE: string;
    ATTACH: string;
    INLINE_EDIT: string;
    CANCEL: string;
    APPROVE: string;
    REJECT: string;
    // VIEW: NS2_ContextType; This doesn't exist (yet?)
}

interface NS2_ScheduledScriptContext {
    type: NS2_ScheduledInvocationTypes;
}

interface NS2_ScheduledInvocationTypes {
    SCHEDULED: string;
    ON_DEMAND: string;
    USER_INTERFACE: string;
    ABORTED: string;
    SKIPPED: string;
}

interface NS2_MapReduce_MapContext {
    key: string;
    value: string;
    write: (key: string, value: string) => void;
}

interface NS2_MapReduce_ReduceContext {
    key: string;
    values: string[];
    write: (key: string, value: string[]) => void;
}

interface NS2_MapReduce_Iterator {
    each(callback: (key: string, value: string) => void) : void;
}

interface NS2_MapReduce_SummaryFunction {
    dateCreated: Date;
    seconds: number;
    usage: number;
    concurrency: number;
    yields: number;
    inputSummary: NS2_MapReduce_InputSummary;
    mapSummary: NS2_MapReduce_MapSummary;
    reduceSummary: NS2_MapReduce_ReduceSummary;
    output: NS2_MapReduce_Iterator;
}

interface NS2_MapReduce_InputSummary {
    dateCreated: Date;
    seconds: number;
    usage: number;
    error: string;
}

interface NS2_MapReduce_MapSummary {
    dateCreated: Date;
    seconds: number;
    usage: number;
    concurrency: number;
    yields: number;
    keys: NS2_MapReduce_Iterator; // TODO: recheck documentation in the future, seems questionable
    errors: NS2_MapReduce_Iterator; // TODO: recheck documentation in the future, seems questionable
}

interface NS2_MapReduce_ReduceSummary {
    dateCreated: Date;
    seconds: number;
    usage: number;
    concurrency: number;
    yields: number;
    keys: NS2_MapReduce_Iterator; // TODO: recheck documentation in the future, seems questionable
    errors: NS2_MapReduce_Iterator; // TODO: recheck documentation in the future, seems questionable
}

interface NS2_Suitelet_Context {
    request: ServerRequest;
    response: ServerResponse;
}
