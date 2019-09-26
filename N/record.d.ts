import { AddSelectOptionOptions } from './ui/serverWidget';

/** 
 * Submits a new record or saves edits to an existing record. 
 * 
 * @governance 20 units for transactions, 4 for custom records, 10 for all other records
 * @return id of submitted record
 */
interface RecordSaveFunction {
    (options?: SubmitConfig): number;
    promise(options?: SubmitConfig): Promise<number>;
}

interface AttachOptions {
    /** The record to attach. */
    record: AttachRecordOptions;
    /** The record that the options.record gets attached to. */
    to: AttachRecordOptions;
    /** The name-value pairs containing attributes for the attachment. */
    attributes?: any;
}

interface AttachRecordOptions {
    /** The type of record to attach. */
    type: Type | string;
    /** The internal ID of the record to attach. */
    id: number | string;
}

interface CancelCommitLineOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
}

interface CopyLoadOptions {
    /** The record type. */
    type: Type | string;
    /** The internal ID of the existing record instance in NetSuite. */
    id: FieldValue | number | string;
    /**
     * Determines whether the new record is dynamic. If set to true, the record is created in dynamic mode. If set to false, the record is created in standard mode. By default, this value is false.
     * - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in standard mode, the record’s body fields and sublist line items are not sourced, calculated, and validated until the record is saved (submitted) with Record.save(options).
     * - When you work with a record in standard mode, you do not need to set values in any particular order. After submitting the record, NetSuite processes the record’s body fields and sublist line items in the correct order, regardless of the organization of your script.
     * - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in dynamic mode, the record’s body fields and sublist line items are sourced, calculated, and validated in real-time. A record in dynamic mode emulates the behavior of a record in the UI.
     * - When you work with a record in dynamic mode, it is important that you set values in the same order you would within the UI. If you fail to do this, your results may not be accurate.
     */
    isDynamic?: boolean;
    /** Name-value pairs containing default values of fields in the new record. */
    defaultValue?: {[fieldId: string]: any};
}

interface DetachOptions {
    /** The record to be detached. */
    record: AttachRecordOptions;
    /** The destination record that options.record should be detached from. */
    from: AttachRecordOptions;
    /** Name-value pairs containing default values of fields in the new record. */
    attributes?: any;
}

interface FindSublistLineWithValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The value to search for. */
    value: FieldValue;
}

interface GetCurrentSublistValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
}

interface GetFieldOptions {
    /** The internal ID of a standard or custom body field. */
    fieldId: string;
}

interface RecordGetLineCountOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
}

interface GetMatrixHeaderCountOptions {
    /** The internal ID of the sublist that contains the matrix. */
    sublistId: string;
    /** The internal ID of the matrix field. */
    fieldId: string;
}

interface GetMatrixHeaderFieldOptions {
    /** The internal ID of the sublist that contains the matrix. */
    sublistId: string;
    /** The internal ID of the matrix field. */
    fieldId: string;
    /** The column number for the field. */
    column: number;
}

interface GetMatrixSublistFieldOptions {
    /** The internal ID of the sublist that contains the matrix. */
    sublistId: string;
    /** The internal ID of the matrix field. */
    fieldId: string;
    /** The line number for the field. */
    line: number;
}
interface GetMatrixSublistValueOptions {
    /** The internal ID of the sublist that contains the matrix. */
    sublistId: string;
    /** The internal ID of the matrix field. */
    fieldId: string;
    /** The line number for the field. */
    line: number;
    /** the column number for the field */
    column: number; 
}

interface GetSublistValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The line number for the field. */
    line: number;
}

interface GetCurrentSublistFieldOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
}

interface GetSublistFieldOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The line number for the field. */
    line: number;
}

interface HasSubrecordOptions {
    /** The internal ID of the field that may contain a subrecord. */
    fieldId: string;
}

interface InsertLineOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The line number to insert. */
    line: number;
    /** If set to true, scripting recalculation is ignored. Default is false. */
    ignoreRecalc?: boolean;
}

interface SelectLineOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The line number to select in the sublist. */
    line: number;
}

interface SetCurrentMatrixSublistValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The column number for the field. */
    column: number
    /**
     * The value to set the field to.
     * The value type must correspond to the field type being set. For example:
     * - Text, Radio and Select fields accept string values.
     * - Checkbox fields accept Boolean values.
     * - Date and DateTime fields accept Date values.
     * - Integer, Float, Currency and Percent fields accept number values.
     */
    value: FieldValue;
    /** If set to true, the field change and slaving event is ignored. Default is false. */
    ignoreFieldChange?: boolean;
    /** Indicates whether to perform slaving synchronously. */
    fireSlavingSync?: boolean;
    /** Use forceSyncSourcing instead of fireSlavingSync on currentRecord module. */
    forceSyncSourcing?: boolean
}

interface SetCurrentSublistValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /**
     * The value to set the field to.
     * The value type must correspond to the field type being set. For example:
     * - Text, Radio and Select fields accept string values.
     * - Checkbox fields accept Boolean values.
     * - Date and DateTime fields accept Date values.
     * - Integer, Float, Currency and Percent fields accept number values.
     */
    value: FieldValue;
    /** If set to true, the field change and slaving event is ignored. Default is false. */
    ignoreFieldChange?: boolean;
    /** Documented in N/currentRecord but not N/record. Set to true to synchronously set this value and its sourced values before returning. */
    fireSlavingSync?: boolean;
    /** Use forceSyncSourcing instead of fireSlavingSync on currentRecord module. */
    forceSyncSourcing?: boolean
}

interface SetCurrentSublistTextOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The text to set the value to. */
    text: string | string[];
    /** If set to true, the field change and slaving event is ignored. Default is false. */
    ignoreFieldChange?: boolean;
    /** Indicates whether to perform field sourcing synchronously.
     * If set to true, sources dependent field information for empty fields synchronously.
     * Defaults to false – dependent field values are not sourced synchronously.
     */
    fireSlavingSync?: boolean;
    /** Use forceSyncSourcing instead of fireSlavingSync on currentRecord module. */
    forceSyncSourcing?: boolean
}

interface SetValueOptions {
    /** The internal ID of a standard or custom body field. */
    fieldId: string;
    /**
     * The value to set the field to.
     * The value type must correspond to the field type being set. For example:
     * - Text, Radio and Select fields accept string values.
     * - Checkbox fields accept Boolean values.
     * - Date and DateTime fields accept Date values.
     * - Integer, Float, Currency and Percent fields accept number values.
     */
    value: FieldValue;
    /** If set to true, the field change and slaving event is ignored. */
    ignoreFieldChange?: boolean;
    /** Documented in N/currentRecord but not N/record. Set to true to synchronously set this value and its sourced values before returning. */
    fireSlavingSync?: boolean;
    /** Use forceSyncSourcing instead of fireSlavingSync on currentRecord module. */
    forceSyncSourcing?: boolean
}

interface SetFieldTextOptions {
    /** The internal ID of a standard or custom body field. */
    fieldId: string;
    /** The text to change the field value to. */
    text: string | string[];
    /** If set to true, the field change and slaving event is ignored. Default is false. */
    ignoreFieldChange?: boolean;
    /** Documented in N/currentRecord but not N/record. Set to true to synchronously set this value and its sourced values before returning. */
    fireSlavingSync?: boolean;
    /** Use forceSyncSourcing instead of fireSlavingSync on currentRecord module. */
    forceSyncSourcing?: boolean
}

interface SetSublistTextOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The line number for the field. */
    line: number;
    /** The text to set the value to. */
    text: string;
    /** WARNING - UNDOCUMENTED. Set to true to synchronously set this value and its sourced values before returning. */
    fireSlavingSync?: boolean;
    /** Use forceSyncSourcing instead of fireSlavingSync on currentRecord module. */
    forceSyncSourcing?: boolean
}

interface SetSublistValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The internal ID of a standard or custom sublist field. */
    line: number;
    /**
     * The value to set the sublist field to.
     * The value type must correspond to the field type being set. For example:
     * - Text, Radio and Select fields accept string values.
     * - Checkbox fields accept Boolean values.
     * - Date and DateTime fields accept Date values.
     * - Integer, Float, Currency and Percent fields accept number values.
     */
    value: FieldValue;
    /** WARNING - UNDOCUMENTED. Set to true to synchronously set this value and its sourced values before returning. */
    fireSlavingSync?: boolean;
    /** Use forceSyncSourcing instead of fireSlavingSync on currentRecord module. */
    forceSyncSourcing?: boolean
}

interface GetSelectOptionsOpts {
    /** The search string to filter the select options that are returned. */
    filter: string;
    /** The following operators are supported: contains, is, startswith. Default is contains. */
    operator: "contains" | "is" | "startswith";
}

export interface Sublist {
    /**
     * The name of the sublist.
     */    
    name: string;   
    /**
     * The name of the sublist.
     */    
    id: string;     
    /**
     * The type of the sublist.
     */    
    type: string;    
    /**
     * The sublist is changed
     */    
    isChanged: boolean;    
    /**
     * The sublist is hidden
     */    
    isHidden: boolean;    
    /**
     * The sublist is display
     */    
    isDisplay: boolean;    
    /**
     * A flag to indicate whether or not the sublist supports multi-line buffer feature.
     */    
    isMultilineEditable: boolean;  
    /**
     * Returns a column in the sublist.
     * Client and server-side scripts
     */
    getColumn(options: GetColumnOptions): Column
    /**
     * Returns the object type name (sublist.Sublist)
     */    
    toString(): string    
    /**
     * JSON.stringify() implementation.
     */    
    toJSON(): {id: string, type: string, isChanged: boolean, isDisplay: boolean}
}
export interface GetColumnOptions {
    /** The internal ID of the column field in the sublist. */
    fieldId: string;
}
/**
 * Encapsulates a column of a sublist on a standard or custom record.
 * For a complete list of this object’s properties, see Column Object Members.
 * This object does not return a value, it returns information about the sublist column.
 * Client and server-side scripts
 */
export interface Column {
    /** Client and server-side scripts. Returns the internal ID of the column. */
    id: string;
    /** Client and server-side scripts. Returns the column type. */
    type: string;
    /** Client and server-side scripts. Returns the UI label for the column. */
    label: string
    /** Client and server-side scripts. Returns the internal ID of the standard or custom sublist that contains the column. */
    sublistId: string
}

/**
 * Client and server-side scripts. 
 * Encapsulates a body or sublist field on a standard or custom record. 
 */
export interface Field {
    /** Adds the select options that appears in the dropdown of a field. */
    insertSelectOption(options: AddSelectOptionOptions): void;
    /** 
     * Returns an array of available options on a standard or custom select, multi-select, or radio field as key-value pairs. Only the first 1,000 available options are returned. 
     * 
     * Returns only the first 1,000 available options are returned in an array. If there are more than 1,000 available options, an empty array [] is returned. This function returns an array in the following format: `[{value: 5, text: 'abc'},{value: 6, text: '123'}]`.
     * 
     * This function returns Type Error if the field is not a supported field for this method.
     */
    getSelectOptions(options?: GetSelectOptionsOpts): { value: any, text: string }[];
    /**
     * Removes a single select option from a select or multiselect field added via script.
     * Note that this API call can only be used on select/multiselect fields that are added via the UI Objects API (for example on Suitelets or beforeLoad user event scripts).
    */
    removeSelectOption(options?: { value: string }): void;
    /** get JSON format of the object */    
    toJSON (options?:any): {id: string, label: string, type: string};
    toString(options?: any): string;
    /** Returns the UI label for a standard or custom field body or sublist field. */
    label: string;
    /** Returns the internal ID of a standard or custom body or sublist field. */
    id: string;
    /** Returns the type of a body or sublist field. */
    type: string;
    /** Returns true if the standard or custom field is mandatory on the record form, or false otherwise. */
    isMandatory: boolean;
    /** Returns true if the standard or custom field is disabled on the record form, or false otherwise. */
    isDisabled: boolean;
    /** Returns true if the field is a popup list field, or false otherwise. */
    isPopup: boolean;
    /** Returns true if the field is set to display on the record form, or false otherwise. */
    isDisplay: boolean;
    /** Returns true if the field is visible on the record form, or false otherwise. */
    isVisible: boolean;
    /**
     * Returns true if the field on the record form cannot be edited, or false otherwise.
     * For textarea fields, this property can be read or written to. For all other fields, this property is read-only.
     */
    isReadOnly: boolean;
    /** Return the sublistId of the field */
    sublistId: string;
}

export type FieldValue = Date | number | number[] | string | string[] | boolean | null;

/** Almost like a full Record, except without things like save(). */
export interface ClientCurrentRecord {
    /** Cancels the currently selected line on a sublist. */
    cancelLine(options: CancelCommitLineOptions): Record;
    cancelLine(sublistId: string): Record;
    /** Commits the currently selected line on a sublist. */
    commitLine(options: CancelCommitLineOptions): Record;
    copy: RecordCopyFunction;
    /** Performs macro operation and returns its result in a plain JavaScript object. */
    executeMacro: ExecuteMacroFunction;
    /** Returns the line number of the first instance where a specified value is found in a specified column of the matrix. */
    findMatrixSublistLineWIthValue(options: FindSublistLineWithValueOptions): number;
    /** Returns the line number for the first occurrence of a field value in a sublist. */
    findSublistLineWithValue(options: FindSublistLineWithValueOptions): number;
    /** Gets the value for the currently selected line in the matrix. */
    getCurrentMatrixSublistValue(options: GetCurrentSublistValueOptions): number | Date | string | string[] | boolean;
    /** Returns the line number of the currently selected line. */  
    
    /**
     * return field object from record's sublist current line. Only available in dynamic record
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if sublistId or fieldId is missing
     * @restriction only available in dynamic record
     */    
    getCurrentSublistField(options: GetCurrentSublistFieldOptions): Field;
    getCurrentSublistIndex(options: RecordGetLineCountOptions): number;
    /** Gets the subrecord for the associated sublist field on the current line. */
    getCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): Record;
    /** Returns a text representation of the field value in the currently selected line. */
    getCurrentSublistText(options: GetCurrentSublistValueOptions): string;
    /** Returns the value of a sublist field on the currently selected sublist line. */
    getCurrentSublistValue(options: GetCurrentSublistValueOptions): FieldValue;
    getCurrentSublistValue(sublistId: string, fieldId: string): FieldValue;

    
    /** 
     * Returns a field object from a record. 
     * 
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.fieldId is missing or undefined
     */
    getField(options: GetFieldOptions): Field;
    /** Returns the number of lines in a sublist. */
    getLineCount(options: RecordGetLineCountOptions): number;
    getLineCount(sublistId: string): number;
    /** Provides a macro to be executed. */
    getMacro(options: { id: string }): Function; // TODO: Test this!
    /** Provides a plain JavaScript object of available macro objects defined for a record type, indexed by the Macro ID. */
    getMacros(): { [macroId: string]: Macro };
    /** Returns the number of columns for the specified matrix. */
    getMatrixHeaderCount(options: GetMatrixHeaderCountOptions): number;
    /** Gets the field for the specified header in the matrix.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if any required values are missing
     */
    getMatrixHeaderField(options: GetMatrixHeaderFieldOptions): Field;
    /** Gets the value for the associated header in the matrix. */
    getMatrixHeaderValue(options: GetMatrixHeaderFieldOptions): FieldValue;
    /** Gets the field for the specified sublist in the matrix. */
    getMatrixSublistField(options: GetMatrixSublistFieldOptions): Field;
    /** Gets the value for the associated field in the matrix. */
    getMatrixSublistValue(options: GetMatrixSublistValueOptions): FieldValue;
    /** Returns the specified sublist. */
    getSublist(options: RecordGetLineCountOptions): Sublist;
    /** 
     * Return field object from record's sublist
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if sublistId or fieldId is missing
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if line number is invalid
     */
    getSublistField(options: GetSublistFieldOptions): Field;
    /** Returns the value of a sublist field in a text representation. */
    getSublistText(options: GetSublistValueOptions): string;
    /** Returns the value of a sublist field. */
    getSublistValue(options: GetSublistValueOptions): FieldValue;
    getSublistValue(sublistId: string, fieldId: string, line: number): FieldValue;
    /** Gets the subrecord for the associated field. */
    getSubrecord(options: GetFieldOptions): Record;
    /** Returns the text representation of a field value. */
    getText(options: GetFieldOptions): string | string[];
    getText(fieldId: string): string | string[];
    /** Returns the value of a field. */
    getValue(options: GetFieldOptions): FieldValue;
    getValue(fieldId: string): FieldValue;
    /** Returns a value indicating whether the associated sublist field has a subrecord on the current line. This method can only be used on dynamic records. */
    hasCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): boolean;
    /** Returns a value indicating whether the associated sublist field contains a subrecord. */
    hasSublistSubrecord(options: GetSublistValueOptions): boolean;
    /** Returns a value indicating whether the field contains a subrecord. */
    hasSubrecord(options: HasSubrecordOptions): boolean;
    /** The internal ID of a specific record. */
    id: number;
    /** Inserts a sublist line. */
    insertLine(options: InsertLineOptions): void;
    /**
     * Indicates whether the record is in dynamic or standard mode.
     * - If set to true, the record is currently in dynamic mode. If set to false, the record is currently in standard mode.
     *  - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in standard mode, the record’s body fields and sublist line items are not sourced, calculated, and validated until the record is saved (submitted) with Record.save(options).
     *  - When you work with a record in standard mode, you do not need to set values in any particular order. After submitting the record, NetSuite processes the record’s body fields and sublist line items in the correct order, regardless of the organization of your script.
     *  - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in dynamic mode, the record’s body fields and sublist line items are sourced, calculated, and validated in real-time. A record in dynamic mode emulates the behavior of a record in the UI.
     *  - When you work with a record in dynamic mode, it is important that you set values in the same order you would within the UI. If you fail to do this, your results may not be accurate.
     * This value is set when the record is created or accessed.
     */
    isDynamic: boolean;
    /** 
     * Removes the subrecord for the associated sublist field on the current line. 
     * @return {Record} same record, for chaining
     */
    removeCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): this;
    /** 
     * Removes a sublist line.
     * @return {Record} same record, for chaining 
     */
    removeLine(options: InsertLineOptions): this;
    /** 
     * Removes the subrecord for the associated field. 
     * @return {Record} same record, for chaining
     */
    removeSubrecord(options: RecordGetLineCountOptions): this;
    /** Selects an existing line in a sublist. */
    selectLine(options: SelectLineOptions): void;
    selectLine(sublistId: string, line: number): void;
    /** Selects a new line at the end of a sublist. */
    selectNewLine(options: RecordGetLineCountOptions): void;
    /** Sets the value for the line currently selected in the matrix. */
    setCurrentMatrixSublistValue(options: SetCurrentMatrixSublistValueOptions): Record;
    /** Sets the value for the field in the currently selected line by a text representation. */
    setCurrentSublistText(options: SetCurrentSublistTextOptions): void;
    /** Sets the value for the field in the currently selected line. */
    setCurrentSublistValue(options: SetCurrentSublistValueOptions): void;
    setCurrentSublistValue(sublistId: string, fieldId: string, value: FieldValue): void;
    /** Sets the value for the associated header in the matrix. */
    setMatrixHeaderValue(options: SetCurrentMatrixSublistValueOptions): Record;
    /** Sets the value for the associated field in the matrix. */
    setMatrixSublistValue(options: SetSublistValueOptions): Record;
    /** Sets the value of the field by a text representation. */
    setText(options: SetFieldTextOptions): void;
    setText(fieldId: string, value: string): void;
    /** Sets the value of a field. */
    setValue(options: SetValueOptions): void;
    setValue(fieldId: string, value: FieldValue): void;
    
    /** The record type. */
    type: Type | string;
}

// Exported for other modules to be able to consume this type
export interface Record extends ClientCurrentRecord {
    /** Returns the body field names (internal ids) of all the fields in the record, including machine header field and matrix header fields. */
    getFields(): string[];
    /** Returns all the names of all the sublists. */
    getSublists(): string[];
    /** Returns all the field names in a sublist. */
    getSublistFields(options: RecordGetLineCountOptions): string[];
    /** Gets the subrecord associated with a sublist field. */
    getSublistSubrecord(options: GetSublistValueOptions): Record;
    /** 
     * Removes the subrecord for the associated sublist field. 
     * @restriction only available in deferred dynamic record
     * @return {Record} same record, for chaining
     */
    removeSublistSubrecord(options: GetSublistValueOptions): this;
    /** 
     * Submits a new record or saves edits to an existing record. 
     * 
     * @governance 20 units for transactions, 4 for custom records, 10 for all other records
     * @return id of submitted record
    */
    save: RecordSaveFunction;
    /** Sets the value of a sublist field by a text representation. */
    setSublistText(options: SetSublistTextOptions): Record;
    /** Sets the value of a sublist field. (standard mode only). */
    setSublistValue(options: SetSublistValueOptions): Record;
    toString(): string;
    /** get JSON format of the object, something like `{id: string, type: string, fields: {[fieldId: string]: any}, sublists: {[sublistId:string]: {[line_id:string]:{[sublist_field_id:string]: string}}}` */  
    toJSON(): RecordToJSONReturnValue
}

export type RecordToJSONReturnValue = {
    id: string,
    type: string,
    isDynamic: boolean,
    fields: {[fieldId: string]: string}
    sublists: {[sublistId: string]: {[lineDescription: string]: string}}
}

interface ExecuteMacroFunction {
  (options: { id: string, params: Object }): Object;
  promise(options: { id: string, params: Object }): Object
}

interface MacroExecuteFunction {
    (options?: { params?: Object }): { notifications: any[], response: Object };
    promise(options?: { params?: Object }): Promise<{ notifications: any[], response: Object }>;
}

interface Macro {
    execute: MacroExecuteFunction;
    id: string;
    label: string;
    description: string;
    attributes: Object;
}

interface SubmitConfig {
    /** Indicates whether to enable sourcing during the record update. Defaults to true. */
    enableSourcing?: boolean;
    /** Indicates whether to ignore mandatory fields during record submission. Default is false. */
    ignoreMandatoryFields?: boolean;
}

export interface SubmitFieldsOptions {
    /** The type of record. */
    type: Type | string;
    /** The internal ID of the existing record instance in NetSuite. */
    id: string | number;
    /** The ID-value pairs for each field you want to edit and submit. */
    values: any;
    /** Additional options to set for the record. */
    options?: SubmitConfig;
}

/**
 * The 'value' parameter in this function is an object with matching properties and values.
 * ex.: value: {'name': 'Bob', 'department': '12'}
 */
interface SubmitFieldsFunction {
    (options: SubmitFieldsOptions): number;
    promise(options: SubmitFieldsOptions): Promise<number>;
}

interface RecordAttachFunction {
    (options: AttachOptions): void;
    promise(options: AttachOptions): Promise<void>;
}

interface RecordCopyFunction {
    (options: CopyLoadOptions): Record;
    promise(options: CopyLoadOptions): Promise<Record>;
}

interface RecordCreateOptions {
    /**
     * The record type.
     */
    type: Type | string;
    /**
     * Determines whether the new record is dynamic. If set to true, the record is created in dynamic mode. If set to false, the record is created in standard mode. By default, this value is false.
     * - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in standard mode, the record’s body fields and sublist line items are not sourced, calculated, and validated until the record is saved (submitted) with Record.save(options).
     * - When you work with a record in standard mode, you do not need to set values in any particular order. After submitting the record, NetSuite processes the record’s body fields and sublist line items in the correct order, regardless of the organization of your script.
     * - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in dynamic mode, the record’s body fields and sublist line items are sourced, calculated, and validated in real-time. A record in dynamic mode emulates the behavior of a record in the UI.
     * - When you work with a record in dynamic mode, it is important that you set values in the same order you would within the UI. If you fail to do this, your results may not be accurate.
     */
    isDynamic?: boolean;
    /**
     * Name-value pairs containing default values of fields in the new record.
     */
    defaultValues?: any;
}


/**
 * Create a new record object based on provided type
 *
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.type is missing
 */
interface RecordCreateFunction {
    (options: RecordCreateOptions): Record;
    promise(options: RecordCreateOptions): Promise<Record>;
}

interface RecordDeleteOptions {
    /**
     * The record type.
     */
    type: Type | string;
    /**
     * The internal ID of the record instance to be deleted.
     */
    id: (string | number);
}

interface RecordDetachFunction {
    (options: DetachOptions): void;
    promise(options: DetachOptions): Promise<void>;
}

/**
 * Loads an existing nlobjRecord from the database based on provided type, id
 *
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * 
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.type or options.id is missing
 */
interface RecordLoadFunction {
    (options: CopyLoadOptions): Record;
    promise(options: CopyLoadOptions): Promise<Record>;
}
/**
 * Delete a record object based on provided type, id and return the id of deleted record
 *
 * @governance 20 units for transactions, 4 for custom records, 10 for all other records
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if type or id is missing
 *
 * @since 2015.2
 */
interface RecordDeleteFunction {
    (options: RecordDeleteOptions): void;
    promise(options: RecordDeleteOptions): Promise<void>;
}

/**
 * Transform a record into another type (i.e. salesOrder -> invoice -or- opportunity -> estimate)
 *
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.type or options.id is missing
 */
interface RecordTransformFunction {
    (options: RecordTransformOptions): Record;
    promise(options: RecordTransformOptions): Promise<Record>;
}

interface RecordTransformOptions {
    /** The record type of the existing record instance being transformed. */
    fromType: string | Type;
    /** The internal ID of the existing record instance being transformed. */
    fromId: number;
    /** The record type of the record returned when the transformation is complete. */
    toType: string | Type;
    /** If set to true, the new record is created in dynamic mode. If set to false, the new record is created in standard mode. */
    isDynamic?: boolean;
    /** Name-value pairs containing default values of fields in the new record. */
    defaultValues?: any;
}

/** Attaches a record to another record. */
export var attach: RecordAttachFunction;
/** Creates a new record by copying an existing record in NetSuite. */
export var copy: RecordCopyFunction;
/** Creates a new record. */
export var create: RecordCreateFunction;
/** Deletes a record. */
declare var deleteFunc: RecordDeleteFunction;
export { deleteFunc as delete };
/** Detaches a record from another record. */
export var detach: RecordDetachFunction;
/**
 * Loads an existing nlobjRecord from the database based on provided type, id
 *
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * 
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.type or options.id is missing
 */
export var load: RecordLoadFunction;
/**
 * commit record field updates to the system.
 * 
 * Updates and submits one or more body fields on an existing record in NetSuite, and returns the internal ID of the parent record.
 * When you use this method, you do not need to load or submit the parent record.
 * You can use this method to edit and submit the following:
 * - Standard body fields that support inline editing (direct list editing). For more information, see Using Inline Editing.
 * - Custom body fields that support inline editing.
 * You cannot use this method to edit and submit the following:
 * - Select fields
 * - Sublist line item fields
 * - Subrecord fields (for example, address fields)
 *
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @restriction only supported for records and fields where DLE (Direct List Editing) is supported
 *
 * @return {number} id of submitted record
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if type or id is missing
 */
export var submitFields: SubmitFieldsFunction;
/** Transforms a record from one type into another, using data from an existing record. */
export var transform: RecordTransformFunction;

/**
 * N/record.Type enum
 *
 */
export declare enum Type {
    ACCOUNT, // 'account'
    ACCOUNTING_BOOK, // 'accountingbook'
    ACCOUNTING_CONTEXT, // 'accountingcontext'
    ACCOUNTING_PERIOD, // 'accountingperiod'
    ADV_INTER_COMPANY_JOURNAL_ENTRY, // 'advintercompanyjournalentry'
    ALLOCATION_SCHEDULE, // 'allocationschedule'
    AMORTIZATION_SCHEDULE, // 'amortizationschedule'
    AMORTIZATION_TEMPLATE, // 'amortizationtemplate'
    ASSEMBLY_BUILD, // 'assemblybuild'
    ASSEMBLY_ITEM, // 'assemblyitem'
    ASSEMBLY_UNBUILD, // 'assemblyunbuild'
    BILLING_ACCOUNT, // 'billingaccount'
    BILLING_CLASS, // 'billingclass'
    BILLING_RATE_CARD, // 'billingratecard'
    BILLING_REVENUE_EVENT, // 'billingrevenueevent'
    BILLING_SCHEDULE, // 'billingschedule'
    BIN, // 'bin'
    BIN_TRANSFER, // 'bintransfer'
    BIN_WORKSHEET, // 'binworksheet'
    BLANKET_PURCHASE_ORDER, // 'blanketpurchaseorder'
    BOM, // 'bom'
    BOM_REVISION, // 'bomrevision'
    BULK_OWNERSHIP_TRANSFER, // 'bulkownershiptransfer'
    BUNDLE_INSTALLATION_SCRIPT, // 'bundleinstallationscript'
    CALENDAR_EVENT, // 'calendarevent'
    CAMPAIGN, // 'campaign'
    CAMPAIGN_RESPONSE, // 'campaignresponse'
    CAMPAIGN_TEMPLATE, // 'campaigntemplate'
    CASH_REFUND, // 'cashrefund'
    CASH_SALE, // 'cashsale'
    CHARGE, // 'charge'
    CHARGE_RULE, // 'chargerule'
    CHECK, // 'check'
    CLASSIFICATION, // 'classification'
    CLIENT_SCRIPT, // 'clientscript'
    CMS_CONTENT, // 'cmscontent'
    CMS_CONTENT_TYPE, // 'cmscontenttype'
    CMS_PAGE, // 'cmspage'
    COMMERCE_CATEGORY, // 'commercecategory'
    COMPETITOR, // 'competitor'
    CONSOLIDATED_EXCHANGE_RATE, // 'consolidatedexchangerate'
    CONTACT, // 'contact'
    CONTACT_CATEGORY, // 'contactcategory'
    CONTACT_ROLE, // 'contactrole'
    COST_CATEGORY, // 'costcategory'
    COUPON_CODE, // 'couponcode'
    CREDIT_CARD_CHARGE, // 'creditcardcharge'
    CREDIT_CARD_REFUND, // 'creditcardrefund'
    CREDIT_MEMO, // 'creditmemo'
    CURRENCY, // 'currency'
    CUSTOMER, // 'customer'
    CUSTOMER_CATEGORY, // 'customercategory'
    CUSTOMER_DEPOSIT, // 'customerdeposit'
    CUSTOMER_MESSAGE, // 'customermessage'
    CUSTOMER_PAYMENT, // 'customerpayment'
    CUSTOMER_PAYMENT_AUTHORIZATION, // 'customerpaymentauthorization'
    CUSTOMER_REFUND, // 'customerrefund'
    CUSTOMER_STATUS, // 'customerstatus'
    CUSTOMER_SUBSIDIARY_RELATIONSHIP, // 'customersubsidiaryrelationship'
    CUSTOM_RECORD, // 'customrecord'
    CUSTOM_TRANSACTION, // 'customtransaction'
    DEPARTMENT, // 'department'
    DEPOSIT, // 'deposit'
    DEPOSIT_APPLICATION, // 'depositapplication'
    DESCRIPTION_ITEM, // 'descriptionitem'
    DISCOUNT_ITEM, // 'discountitem'
    DOWNLOAD_ITEM, // 'downloaditem'
    DRIVERS_LICENSE,
    EMAIL_TEMPLATE, // 'emailtemplate'
    EMPLOYEE, // 'employee'
    ENTITY_ACCOUNT_MAPPING, // 'entityaccountmapping'
    ESTIMATE, // 'estimate'
    EXPENSE_CATEGORY, // 'expensecategory'
    EXPENSE_REPORT, // 'expensereport'
    FAIR_VALUE_PRICE, // 'fairvalueprice'
    FIXED_AMOUNT_PROJECT_REVENUE_RULE, // 'fixedamountprojectrevenuerule'
    FOLDER, // 'folder'
    FULFILLMENT_REQUEST, // 'fulfillmentrequest'
    GENERAL_TOKEN, // 'generaltoken'
    GENERIC_RESOURCE, // 'genericresource'
    GIFT_CERTIFICATE, // 'giftcertificate'
    GIFT_CERTIFICATE_ITEM, // 'giftcertificateitem'
    GLOBAL_ACCOUNT_MAPPING, // 'globalaccountmapping'
    GLOBAL_INVENTORY_RELATIONSHIP, // 'globalinventoryrelationship'
    GOVERNMENT_ISSUED_ID_TYPE,
    HCM_JOB,
    INBOUND_SHIPMENT, // 'inboundshipment'
    INTERCOMP_ALLOCATION_SCHEDULE, // 'intercompallocationschedule'
    INTER_COMPANY_JOURNAL_ENTRY, // 'intercompanyjournalentry'
    INTER_COMPANY_TRANSFER_ORDER, // 'intercompanytransferorder'
    INVENTORY_ADJUSTMENT, // 'inventoryadjustment'
    INVENTORY_COST_REVALUATION, // 'inventorycostrevaluation'
    INVENTORY_COUNT, // 'inventorycount'
    INVENTORY_DETAIL, // 'inventorydetail'
    INVENTORY_ITEM, // 'inventoryitem'
    INVENTORY_NUMBER, // 'inventorynumber'
    INVENTORY_STATUS, // 'inventorystatus'
    INVENTORY_STATUS_CHANGE, // 'inventorystatuschange'
    INVENTORY_TRANSFER, // 'inventorytransfer'
    INVOICE, // 'invoice'
    ISSUE, // 'issue'
    ISSUE_PRODUCT, // 'issueproduct'
    ISSUE_PRODUCT_VERSION, // 'issueproductversion'
    ITEM_ACCOUNT_MAPPING, // 'itemaccountmapping'
    ITEM_DEMAND_PLAN, // 'itemdemandplan'
    ITEM_FULFILLMENT, // 'itemfulfillment'
    ITEM_GROUP, // 'itemgroup'
    ITEM_LOCATION_CONFIGURATION, // 'itemlocationconfiguration'
    ITEM_RECEIPT, // 'itemreceipt'
    ITEM_REVISION, // 'itemrevision'
    ITEM_SUPPLY_PLAN, // 'itemsupplyplan'
    JOB, // 'job'
    JOB_REQUISITION,
    JOB_STATUS, // 'jobstatus'
    JOB_TYPE, // 'jobtype'
    JOURNAL_ENTRY, // 'journalentry'
    KIT_ITEM, // 'kititem'
    KUDOS,
    LABOR_BASED_PROJECT_REVENUE_RULE, // 'laborbasedprojectrevenuerule'
    LEAD, // 'lead'
    LOCATION, // 'location'
    LOT_NUMBERED_ASSEMBLY_ITEM, // 'lotnumberedassemblyitem'
    LOT_NUMBERED_INVENTORY_ITEM, // 'lotnumberedinventoryitem'
    MANUFACTURING_COST_TEMPLATE, // 'manufacturingcosttemplate'
    MANUFACTURING_OPERATION_TASK, // 'manufacturingoperationtask'
    MANUFACTURING_ROUTING, // 'manufacturingrouting'
    MAP_REDUCE_SCRIPT, // 'mapreducescript'
    MARKUP_ITEM, // 'markupitem'
    MASSUPDATE_SCRIPT, // 'massupdatescript'
    MERCHANDISE_HIERARCHY_LEVEL, // 'merchandisehierarchylevel'
    MERCHANDISE_HIERARCHY_NODE, // 'merchandisehierarchynode'
    MERCHANDISE_HIERARCHY_VERSION, // 'merchandisehierarchyversion'
    MESSAGE, // 'message'
    MFG_PLANNED_TIME, // 'mfgplannedtime'
    NEXUS, // 'nexus'
    NON_INVENTORY_ITEM, // 'noninventoryitem'
    NOTE, // 'note'
    NOTE_TYPE, // 'notetype'
    OPPORTUNITY, // 'opportunity'
    ORDER_SCHEDULE, // 'orderschedule'
    ORGANIZATION_VALUE,
    OTHER_CHARGE_ITEM, // 'otherchargeitem'
    OTHER_GOVERNMENT_ISSUED_ID,
    OTHER_NAME, // 'othername'
    OTHER_NAME_CATEGORY, // 'othernamecategory'
    PARTNER, // 'partner'
    PARTNER_CATEGORY, // 'partnercategory'
    PASSPORT,
    PAYCHECK, // 'paycheck'
    PAYCHECK_JOURNAL, // 'paycheckjournal'
    PAYMENT_CARD, // 'paymentcard'
    PAYMENT_CARD_TOKEN, // 'paymentcardtoken'
    PAYMENT_ITEM, // 'paymentitem'
    PAYMENT_METHOD, // 'paymentmethod'
    PAYROLL_ITEM, // 'payrollitem'
    PERIOD_END_JOURNAL, // 'periodendjournal'
    PCT_COMPLETE_PROJECT_REVENUE_RULE, // 'pctcompleteprojectrevenuerule'
    PHONE_CALL, // 'phonecall'
    PORTLET, // 'portlet'
    POSITION,
    PRICE_BOOK, // 'pricebook'
    PRICE_LEVEL, // 'pricelevel'
    PRICE_PLAN, // 'priceplan'
    PRICING_GROUP, // 'pricinggroup'
    PROJECT_EXPENSE_TYPE, // 'projectexpensetype'
    PROJECT_TASK, // 'projecttask'
    PROJECT_TEMPLATE, // 'projecttemplate'
    PROMOTION_CODE, // 'promotioncode'
    PROSPECT, // 'prospect'
    PURCHASE_CONTRACT, // 'purchasecontract'
    PURCHASE_ORDER, // 'purchaseorder'
    PURCHASE_REQUISITION, // 'purchaserequisition'
    RATE_PLAN,
    REALLOCATE_ITEM, // 'reallocateitem'
    RECEIVE_INBOUND_SHIPMENT, // 'receiveinboundshipment'
    RESOURCE_ALLOCATION, // 'resourceallocation'
    RESTLET, // 'restlet'
    RETURN_AUTHORIZATION, // 'returnauthorization'
    REVENUE_ARRANGEMENT, // 'revenuearrangement'
    REVENUE_COMMITMENT, // 'revenuecommitment'
    REVENUE_COMMITMENT_REVERSAL, // 'revenuecommitmentreversal'
    REVENUE_PLAN, // 'revenueplan'
    REV_REC_SCHEDULE, // 'revrecschedule'
    REV_REC_TEMPLATE, // 'revrectemplate'
    SALES_ORDER, // 'salesorder'
    SALES_ROLE, // 'salesrole'
    SALES_TAX_ITEM, // 'salestaxitem'
    SCHEDULED_SCRIPT, // 'scheduledscript'
    SCHEDULED_SCRIPT_INSTANCE, // 'scheduledscriptinstance'
    SCRIPT_DEPLOYMENT, // 'scriptdeployment'
    SERIALIZED_ASSEMBLY_ITEM, // 'serializedassemblyitem'
    SERIALIZED_INVENTORY_ITEM, // 'serializedinventoryitem'
    SERVICE_ITEM, // 'serviceitem'
    SHIP_ITEM, // 'shipitem'
    SOLUTION, // 'solution'
    STATISTICAL_JOURNAL_ENTRY, // 'statisticaljournalentry'
    STORE_PICKUP_FULFILLMENT, // 'storepickupfulfillment'
    SUBSCRIPTION, // 'subscription'
    SUBSCRIPTION_CHANGE_ORDER, // 'subscriptionchangeorder'
    SUBSCRIPTION_LINE, // 'subscriptionline'
    SUBSCRIPTION_PLAN, // 'subscriptionplan'
    SUBSIDIARY, // 'subsidiary'
    SUBTOTAL_ITEM, // 'subtotalitem'
    SUITELET, // 'suitelet'
    SUPPLY_CHAIN_SNAPSHOT, // 'supplychainsnapshot'
    SUPPORT_CASE, // 'supportcase'
    TASK, // 'task'
    TAX_ACCT, // 'taxacct'
    TAX_GROUP, // 'taxgroup'
    TAX_PERIOD, // 'taxperiod'
    TAX_TYPE, // 'taxtype'
    TERM, // 'term'
    TERMINATION_REASON,
    TIME_BILL, // 'timebill'
    TIME_ENTRY, // 'timeentry'
    TIME_OFF_CHANGE, // 'timeoffchange'
    TIME_OFF_PLAN, // 'timeoffplan'
    TIME_OFF_REQUEST, // 'timeoffrequest'
    TIME_OFF_RULE, // 'timeoffrule'
    TIME_OFF_TYPE, // 'timeofftype'
    TIME_SHEET, // 'timesheet'
    TOPIC, // 'topic'
    TRANSFER_ORDER, // 'transferorder'
    UNITS_TYPE, // 'unitstype'
    USAGE, // 'usage'
    USEREVENT_SCRIPT, // 'usereventscript'
    VENDOR, // 'vendor'
    VENDOR_BILL, // 'vendorbill'
    VENDOR_CATEGORY, // 'vendorcategory'
    VENDOR_CREDIT, // 'vendorcredit'
    VENDOR_PAYMENT, // 'vendorpayment'
    VENDOR_RETURN_AUTHORIZATION, // 'vendorreturnauthorization'
    VENDOR_SUBSIDIARY_RELATIONSHIP, // 'vendorsubsidiaryrelationship'
    WEBSITE, // 'website'
    WORKFLOW_ACTION_SCRIPT, // 'workflowactionscript'
    WORK_ORDER, // 'workorder'
    WORK_ORDER_CLOSE, // 'workorderclose'
    WORK_ORDER_COMPLETION, // 'workordercompletion'
    WORK_ORDER_ISSUE, // 'workorderissue'
    WORKPLACE, // 'workplace'
}
