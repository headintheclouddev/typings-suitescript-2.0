/// <reference path="../N/http.d.ts" />
/// <reference path="../N/record.d.ts" />
/// <reference path="../N/ui/serverWidget.d.ts" />

interface NS2_Client_FieldChangedContext {
	currentRecord: ClientCurrentRecord;
	sublistId: string;
	fieldId: string;
	lineNum: string;
	columnNum: string;
}

interface NS2_Client_FieldChanged {
    (scriptContext?: NS2_Client_FieldChangedContext): void;
}

interface NS2_Client_LineInitContext {
	currentRecord: ClientCurrentRecord;
	sublistId: string;
}

interface NS2_Client_LineInit {
  (scriptContext?: NS2_Client_LineInitContext): void;
}

interface NS2_Client_PageInitContext {
	currentRecord: ClientCurrentRecord;
	mode: string;
}

interface NS2_Client_PageInit {
    (scriptContext?: NS2_Client_PageInitContext): void;
}

interface NS2_Client_PostSourceContext {
    currentRecord: ClientCurrentRecord;
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
    currentRecord: ClientCurrentRecord;
}

interface NS2_Client_SublistChangedContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
}

interface NS2_Client_SublistChanged {
    (scriptContext?: NS2_Client_SublistChangedContext): void;
}

interface NS2_Client_ValidateDeleteContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
}

interface NS2_Client_ValidateDelete {
    (scriptContext?: NS2_Client_ValidateDeleteContext): boolean;
}

interface NS2_Client_ValidateFieldContext {
    currentRecord: ClientCurrentRecord;
    sublistId: string;
    fieldId: string;
    lineNum?: string;
    columnNum?: string;
}

interface NS2_Client_ValidateField {
    (scriptContext?: NS2_Client_ValidateFieldContext): boolean;
}

interface NS2_Client_ValidateInsertContext {
     currentRecord: ClientCurrentRecord;
    sublistId: string;
}

interface NS2_Client_ValidateInsert {
    (scriptContext?: NS2_Client_ValidateInsertContext): boolean;
}

interface NS2_Client_ValidateLineContext {
     currentRecord: ClientCurrentRecord;
     sublistId: string;
}

interface NS2_Client_ValidateLine {
     (scriptContext?: NS2_Client_ValidateLineContext): boolean;
}

interface NS2_UE_BeforeLoadContext {
     newRecord: Record;
     type: string;
     form: UIForm;
     UserEventType: NS2_UserEventTypes;
}

interface NS2_UE_BeforeSubmitContext {
    newRecord: Record;
    oldRecord: Record;
    type: string;
    UserEventType: NS2_UserEventTypes;
}

interface NS2_UE_AfterSubmitContext {
    newRecord: Record;
    oldRecord: Record;
    type: string;
    UserEventType: NS2_UserEventTypes;
}

interface NS2_UserEventTypes {
    APPROVE: string;
    CANCEL: string;
    CHANGEPASSWORD: string;
    COPY: string;
    CREATE: string;
    DELETE: string;
    DROPSHIP: string;
    EDIT: string;
    EDITFORECAST: string;
    EMAIL: string;
    MARKCOMPLETE: string;
    ORDERITEMS: string;
    PACK: string;
    PAYBILLS: string;
    PRINT: string;
    QUICKVIEW: string;
    REASSIGN: string;
    REJECT: string;
    SHIP: string;
    SPECIALORDER: string;
    TRANSFORM: string;
    VIEW: string;
    XEDIT: string;
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

interface NS2_MassUpdate_Context {
    id: string;
    type: string; 
}

interface NS2_Portlet_Form_Context {
    portlet: PortletForm;
}

interface NS2_Portlet_HTML_Context {
    portlet: PortletHTML;
}

interface NS2_Suitelet_Context {
    request: ServerRequest;
    response: ServerResponse;
}

interface ClientCurrentRecord {
    cancelLine(options: CancelCommitLineOptions): void;
    cancelLine(sublistId: string): void;
    commitLine(options: CancelCommitLineOptions): void;
    findMatrixSublistLineWithValue(options: any): number; // TODO: Document this?
    findSublistLineWithValue(options: FindSublistLineWithValueOptions): number;
    getCurrentMatrixSublistValue(options: any): string; // TODO: Document this?
    getCurrentSublistIndex(options: RecordGetLineCountOptions): number;
    getCurrentSublistSubrecord(options: any): Record; // TODO: Document this?
    getCurrentSublistText(options: GetCurrentSublistValueOptions): string; // TODO: Document this?
    getCurrentSublistValue(options: GetCurrentSublistValueOptions): string;
    getCurrentSublistValue(sublistId: string, fieldId: string): string;
    getField(options: GetFieldOptions): Field;
    // getFields(): string[];
    getLineCount(options: RecordGetLineCountOptions): number;
    getLineCount(sublistId: string): number;
    getMatrixHeaderCount(options: any): number; // TODO: Document this?
    getMatrixHeaderField(options: any): Field;  // TODO: Document this?
    getMatrixHeaderValue(options: any): string; // TODO: Document this?
    getMatrixSublistField(options: any): Field; // TODO: Document this?
    getMatrixSublistValue(options: any): string; // TODO: Document this?
    getSublist(options: any): UISublist; // TODO: Document this?
    getSublistField(options: GetSublistValueOptions): Field;
    // getSublistFields(options: RecordGetLineCountOptions): string[];
    // getSublistSubrecord(options: GetSublistValueOptions): Record;
    getSublistText(options: GetSublistValueOptions): string;
    getSublistValue(options: GetSublistValueOptions): string;
    getSublistValue(sublistId: string, fieldId: string, line: number): string;
    getSubRecord(options: GetFieldOptions): Record;
    getText(options:GetFieldOptions): string;
    getText(fieldId:string): string;
    getValue(options:GetFieldOptions): Date|number|string|string[]|boolean;
    getValue(fieldId:string): string;
    hasCurrentSublistSubrecord(options: any): boolean; // TODO: Document this?
    hasSublistSubrecord(options: any): boolean; // TODO: Document this?
    hasSubrecord(options: any): boolean; // TODO: Document this?
    id: string; 
    insertLine(options: InsertLineOptions): void;
    isDynamic: boolean;
    removeCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): void;
    removeLine(options: InsertLineOptions): void;
    // removeSublistSubrecord(options: GetSublistValueOptions): Record;
    removeSubrecord(options: RecordGetLineCountOptions): void;
    // save(): RecordSaveFunction;
    selectLine(options: SelectLineOptions): void;
    selectLine(sublistId: string, line: number): void;
    selectNewLine(options: RecordGetLineCountOptions): void;
    setCurrentMatrixSublistValue(options: any): void; // TODO: Document this?
    setCurrentSublistText(options: SetCurrentSublistTextOptions): void;
    setCurrentSublistValue(options: SetCurrentSublistValueOptions): void;
    setCurrentSublistValue(sublistId: string, fieldId: string, value: string|number): void;
    setMatrixHeaderValue(options: any): void; // TODO: Document this?
    setMatrisSublistValue(options: any): void; // TODO: Document this?
    // setSublistText(options: SetSublistTextOptions): Record;
    // setSublistValue(options: SetSublistValueOptions): Record;
    setText(options: SetFieldTextOptions): void;
    setText(fieldId: string, value: string): void;
    setValue(options: SetFieldOptions): void;
    setValue(fieldId: string, value: string): void;
    // toString(): string;
    type: string;
}

interface PortletForm { // Haven't validated that all these methods actually exist yet 
    // addButton(options: AddButtonOptions): UIButton;
    addCredentialField(options: AddCredentialFieldOptions): UIField;
    addField(options: AddFieldOptions): UIField;
    addFieldGroup(options: AddFieldGroupOptions): UIFieldGroup;
    addPageLink(options: AddPageLinkOptions): void;
    addResetButton(options: AddResetButtonOptions): UIButton;
    addSublist(options: AddSublistOptions): UISublist;
    addSubmitButton(label: string): void; // Not documented. Is there some other way to do this now?
    addSubtab(options: AddSubtabOptions): UITab;
    addTab(options: AddFieldGroupOptions): UITab;
    clientScript(options: ClientScriptOptions): void;
    getButton(options: IDOptions): UIButton;
    getField(options: UIGetFieldOptions): UIField;
    getSublist(options: IDOptions): UISublist;
    getSubtab(options: IDOptions): UITab;
    getTabs(): UITab[];
    insertField(options: InsertFieldOptions): UIField;
    insertSublist(options: InsertSublistOptions): UISublist;
    insertSubtab(options: InsertSubtabOptions): UITab;
    insertTab(options: InsertSubtabOptions): UITab;
    // removeButton(options: IDOptions): void;
    setDefaultValues(options: SetDefaultValuesOptions): void;
    title: string;
}

interface PortletHTML {
    html: string;
    title: string;
}
