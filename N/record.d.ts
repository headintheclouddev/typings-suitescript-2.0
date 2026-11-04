import type {AddSelectOptionOptions} from './ui/serverWidget';

/** 
 * Submits a new record or saves edits to an existing record. 
 * 
 * @governance 20 units for transactions, 4 for custom records, 10 for all other records
 * @return id of submitted record
 */
interface RecordSaveFunction {
    /**
     * @governance 20 units for transactions, 4 for custom records, 10 for all other records
     * @since 2015.2
     */
    (options?: SubmitConfig): number;
    /**
     * @governance 20 units for transactions, 4 for custom records, 10 for all other records
     * @since 2015.2
     */
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

interface CommitLineOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** If set to true, scripting recalculation is ignored. */
    ignoreRecalc?: boolean;
}


interface CancelCommitLineOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
}

export interface CopyLoadOptions {
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
    defaultValues?: {[fieldId: string]: any};
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
    value: Readonly<FieldValue>;
}

interface GetCurrentMatrixSublistValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The column number for the matrix field. Note that column indexing begins at 0 with SuiteScript 2.0. */
    column: number;
}

interface GetCurrentSublistValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
}

export interface GetFieldOptions {
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
    /** The column number for the field. */
    column: number;
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

interface MoveLineOptions {
    sublistId: string;
    from:      number;
    to:        number;
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
    value: Readonly<FieldValue>;
    /** If set to true, the field change and slaving event is ignored. Default is false. */
    ignoreFieldChange?: boolean;
    /** Indicates whether to perform slaving synchronously. */
    fireSlavingSync?: boolean;
    /**
     * Use forceSyncSourcing instead of fireSlavingSync on currentRecord module.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean
}
interface SetMatrixSublistValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The line number to set in the sublist. */
    line: number;
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
    value: Readonly<FieldValue>;
    /** Indicates whether to perform slaving synchronously. */
    fireSlavingSync?: boolean;
    /**
     * Use forceSyncSourcing instead of fireSlavingSync on currentRecord module.
     * @since 2019.1
     */
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
    value: Readonly<FieldValue>;
    /** If set to true, the field change and slaving event is ignored. Default is false. */
    ignoreFieldChange?: boolean;
    /** Documented in N/currentRecord but not N/record. Set to true to synchronously set this value and its sourced values before returning. */
    fireSlavingSync?: boolean;
    /**
     * Use forceSyncSourcing instead of fireSlavingSync on currentRecord module.
     * @since 2019.1
     */
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
    /**
     * Use forceSyncSourcing instead of fireSlavingSync on currentRecord module.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean
}

export interface SetValueOptions {
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
    value: Readonly<FieldValue>;
    /** If set to true, the field change and slaving event is ignored. */
    ignoreFieldChange?: boolean;
    /** Documented in N/currentRecord but not N/record. Set to true to synchronously set this value and its sourced values before returning. */
    fireSlavingSync?: boolean;
    /**
     * Use forceSyncSourcing instead of fireSlavingSync on currentRecord module.
     * @since 2019.1
     */
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
    /**
     * Use forceSyncSourcing instead of fireSlavingSync on currentRecord module.
     * @since 2019.1
     */
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
    /**
     * Use forceSyncSourcing instead of fireSlavingSync on currentRecord module.
     * @since 2019.1
     */
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
    value: Readonly<FieldValue>;
    /** WARNING - UNDOCUMENTED. Set to true to synchronously set this value and its sourced values before returning. */
    fireSlavingSync?: boolean;
    /**
     * Use forceSyncSourcing instead of fireSlavingSync on currentRecord module.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean
}

interface GetSelectOptionsOpts {
    /** The search string to filter the select options that are returned. */
    filter: string;
    /** The following operators are supported: contains, is, startswith. Default is contains. */
    operator: "contains" | "is" | "startswith";
}

/** @since 2015.2 */
export interface Sublist {
    /**
     * The name of the sublist.
     */    
    name: string;   
    /**
     * The name of the sublist.
     * @since 2015.2
     */    
    id: string;     
    /**
     * The type of the sublist.
     * @since 2015.2
     */    
    type: string;    
    /**
     * The sublist is changed
     * @since 2015.2
     */    
    isChanged: boolean;    
    /**
     * The sublist is hidden
     */    
    isHidden: boolean;    
    /**
     * The sublist is display
     * @since 2015.2
     */    
    isDisplay: boolean;    
    /**
     * A flag to indicate whether or not the sublist supports multi-line buffer feature.
     */    
    isMultilineEditable: boolean;  
    /**
     * Returns a column in the sublist, or null if the sublist has no such column (such as a custom column that is not
     * available on the form).
     * Client and server-side scripts
     * @governance none
     * @since 2015.2
     */
    getColumn(options: GetColumnOptions): Column | null
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
 * @since 2015.2
 */
export interface Column {
    /**
     * Client and server-side scripts. Returns the internal ID of the column.
     * @since 2015.2
     */
    id: string;
    /**
     * Client and server-side scripts. Returns the column type.
     * @since 2015.2
     */
    type: string;
    /**
     * Client and server-side scripts. Returns the UI label for the column.
     * @since 2015.2
     */
    label: string
    /**
     * Client and server-side scripts. Returns the internal ID of the standard or custom sublist that contains the column.
     * @since 2015.2
     */
    sublistId: string
    /**
     * Indicates whether the column is disabled.
     * @since 2020.2
     */
    isDisabled: boolean;
    /**
     * Indicates whether the column is displayed.
     * @since 2020.2
     */
    isDisplay: boolean;
    /**
     * Indicates whether the column is mandatory.
     * @since 2020.2
     */
    isMandatory: boolean;
    /**
     * Indicates whether the column is sortable.
     * @since 2020.2
     */
    isSortable: boolean;
}

/**
 * Client and server-side scripts. 
 * Encapsulates a body or sublist field on a standard or custom record. 
 * @since 2015.2
 */
export interface Field {
    /**
     * Adds the select options that appears in the dropdown of a field.
     * @throws {SuiteScriptError} SSS_INVALID_UI_OBJECT_TYPE if a script uses this method on the wrong type of field
     * @governance none
     * @since 2016.2
     */
    insertSelectOption(options: AddSelectOptionOptions): void;
    /**
     * Returns an array of available options on a standard or custom select, multi-select, or radio field as key-value pairs. Only the first 1,000 available options are returned. 
     *
     * Returns only the first 1,000 available options are returned in an array. If there are more than 1,000 available options, an empty array [] is returned. This function returns an array in the following format: `[{value: 5, text: 'abc'},{value: 6, text: '123'}]`.
     *
     * This function returns Type Error if the field is not a supported field for this method.
     * @governance none
     * @since 2015.2
     */
    getSelectOptions(options?: GetSelectOptionsOpts): { value: any, text: string }[];
    /**
     * Removes a single select option from a select or multiselect field added via script.
     * Note that this API call can only be used on select/multiselect fields that are added via the UI Objects API (for example on Suitelets or beforeLoad user event scripts).
     * @throws {SuiteScriptError} SSS_INVALID_UI_OBJECT_TYPE if a script uses this method on the wrong type of field
     * @governance none
     * @since 2016.2
     */
    removeSelectOption(options?: { value: string }): void;
    /** get JSON format of the object */    
    toJSON (options?:any): {id: string, label: string, type: string};
    toString(options?: any): string;
    /**
     * Returns the UI label for a standard or custom field body or sublist field.
     * @since 2015.2
     */
    label: string;
    /**
     * Returns the internal ID of a standard or custom body or sublist field.
     * @since 2015.2
     */
    id: string;
    /**
     * Returns the type of a body or sublist field.
     * @since 2015.2
     */
    type: string;
    /**
     * Returns true if the standard or custom field is mandatory on the record form, or false otherwise.
     * @since 2015.2
     */
    isMandatory: boolean;
    /**
     * Returns true if the standard or custom field is disabled on the record form, or false otherwise.
     * @since 2016.2
     */
    isDisabled: boolean;
    /**
     * Returns true if the field is a popup list field, or false otherwise.
     * @since 2016.2
     */
    isPopup: boolean;
    /**
     * Returns true if the field is set to display on the record form, or false otherwise.
     * @since 2015.2
     */
    isDisplay: boolean;
    /**
     * Returns true if the field is visible on the record form, or false otherwise.
     * @since 2016.2
     */
    isVisible: boolean;
    /**
     * Returns true if the field on the record form cannot be edited, or false otherwise.
     * For textarea fields, this property can be read or written to. For all other fields, this property is read-only.
     * @since 2016.2
     */
    isReadOnly: boolean;
    /**
     * Return the sublistId of the field
     * @since 2015.2
     */
    sublistId: string;
}

export type FieldValue = Date | number | number[] | string | string[] | boolean | null;

/** Almost like a full Record, except without things like save(). */
export interface ClientCurrentRecord {
    /**
     * Cancels the currently selected line on a sublist.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    cancelLine(options: CancelCommitLineOptions): Record;
    // cancelLine(sublistId: string): Record; // Deprecated in 2026.1.8
    /**
     * Commits the currently selected line on a sublist.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    commitLine(options: CommitLineOptions): Record;
    copy: RecordCopyFunction;
    /**
     * Performs macro operation and returns its result in a plain JavaScript object.
     * @governance none
     * @since 2018.2
     */
    executeMacro: ExecuteMacroFunction;
    /**
     * Returns the line number of the first instance where a specified value is found in a specified column of the matrix.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    findMatrixSublistLineWithValue(options: FindSublistLineWithValueOptions): number;
    /**
     * Returns the line number for the first occurrence of a field value in a sublist.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or not defined
     * @governance none
     * @since 2015.2
     */
    findSublistLineWithValue(options: FindSublistLineWithValueOptions): number;
    /**
     * Gets the value for the currently selected line in the matrix.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getCurrentMatrixSublistValue(options: GetCurrentMatrixSublistValueOptions): number | Date | string | string[] | boolean;
    /**
     * return field object from record's sublist current line. Only available in dynamic record
     * @restriction only available in dynamic record
     * @returns The field, or null if the field is not available on the current line (such as a custom column that is
     * not available on the form). For a sublist that does not exist, this returns null on the server, but throws
     * SSS_MISSING_REQD_ARGUMENT in the browser.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2016.2
     */
    getCurrentSublistField(options: GetCurrentSublistFieldOptions): Field | null;
    /**
     * Returns the line number of the currently selected line.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getCurrentSublistIndex(options: RecordGetLineCountOptions): number;
    /**
     * Gets the subrecord for the associated sublist field on the current line.
     * @governance none
     * @since 2015.2
     */
    getCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): Record;
    /**
     * Returns a text representation of the field value in the currently selected line, or undefined if the sublist has no such field.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getCurrentSublistText(options: GetCurrentSublistValueOptions): string | undefined;
    /**
     * Returns the value of a sublist field on the currently selected sublist line, or undefined if the sublist has no such field.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getCurrentSublistValue(options: GetCurrentSublistValueOptions): FieldValue | undefined;
    // getCurrentSublistValue(sublistId: string, fieldId: string): FieldValue; // Deprecated in 2026.1.8
    /**
     * Returns a field object from a record. 
     *
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getField(options: GetFieldOptions): Field | null;
    /**
     * Returns the number of lines in a sublist.
     * @governance none
     * @since 2015.2
     */
    getLineCount(options: RecordGetLineCountOptions): number;
    // getLineCount(sublistId: string): number; // Deprecated in 2026.1.8
    /**
     * Provides a macro to be executed.
     * @throws {SuiteScriptError} SSS_INVALID_MACRO_ID if a macro does not exist on the record
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
     * @governance none
     * @since 2018.2
     */
    getMacro(options: { id: string }): Function; // TODO: Test this!
    /**
     * Provides a plain JavaScript object of available macro objects defined for a record type, indexed by the Macro ID.
     * @throws {SuiteScriptError} SSS_INVALID_RECORD_TYPE if the specified record type is invalid
     * @governance none
     * @since 2018.2
     */
    getMacros(): { [macroId: string]: Macro };
    /**
     * Returns the number of columns for the specified matrix.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getMatrixHeaderCount(options: GetMatrixHeaderCountOptions): number;
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getMatrixHeaderField(options: GetMatrixHeaderFieldOptions): Field;
    /**
     * Gets the value for the associated header in the matrix.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getMatrixHeaderValue(options: GetMatrixHeaderFieldOptions): FieldValue;
    /**
     * Gets the field for the specified sublist in the matrix.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getMatrixSublistField(options: GetMatrixSublistFieldOptions): Field;
    /**
     * Gets the value for the associated field in the matrix.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getMatrixSublistValue(options: GetMatrixSublistValueOptions): FieldValue;
    /**
     * Returns the specified sublist, or null if it does not exist.
     * @governance none
     * @since 2015.2
     */
    getSublist(options: RecordGetLineCountOptions): Sublist | null;
    /**
     * Return field object from record's sublist
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if sublistId or fieldId is missing
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if line number is invalid
     * @returns The field, or null if the field is not available on the line (such as a custom column that is not
     * available on the form). For a sublist that does not exist, this also returns null in standard mode, but throws
     * SSS_INVALID_SUBLIST_OPERATION in dynamic mode and in the browser.
     * @governance none
     * @since 2015.2
     */
    getSublistField(options: GetSublistFieldOptions): Field | null;
    /**
     * Returns the value of a sublist field in a text representation, or undefined if the sublist has no such field.
     * @throws {SuiteScriptError} SSS_INVALID_API_USAGE in standard mode, if getSublistText is used before setSublistText on a new record, or after setSublistValue on a loaded record, for the same field
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getSublistText(options: GetSublistValueOptions): string | undefined;
    /**
     * Returns the value of a sublist field, or undefined if the sublist has no such field. In standard mode, a line or
     * sublist that does not exist also gives undefined; in dynamic mode and in the browser, it throws
     * SSS_INVALID_SUBLIST_OPERATION.
     * @throws {SuiteScriptError} SSS_INVALID_API_USAGE if invoked prior to using setSublistValue in standard record mode
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getSublistValue(options: GetSublistValueOptions): FieldValue | undefined;
    // getSublistValue(sublistId: string, fieldId: string, line: number): FieldValue; // Deprecated in 2026.1.8
    /**
     * Gets the subrecord for the associated field.
     * @throws {SuiteScriptError} FIELD_1_IS_DISABLED_YOU_CANNOT_APPLY_SUBRECORD_OPERATION_ON_THIS_FIELD if the specified field is disabled
     * @throws {SuiteScriptError} FIELD_1_IS_NOT_A_SUBRECORD_FIELD if the specified field is not a subrecord field
     * @throws {SuiteScriptError} SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION if the specified fieldId does not refer to a subrecord (documented for N/currentRecord only)
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getSubrecord(options: GetFieldOptions): Omit<Record, "save">;
    /**
     * Returns the text representation of a field value, or undefined if the record has no such field.
     * @throws {SuiteScriptError} SSS_INVALID_API_USAGE in certain cases in standard mode, such as calling getText on a field before setting it with setText on a new record, or after setValue on a loaded record
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getText(options: GetFieldOptions): string | string[] | undefined;
    /** Returns the text representation of a field value, or undefined if the record has no such field. Warning: this is an undocumented function overload. */
    getText(fieldId: string): string | string[] | undefined;
    /**
     * Returns the value of a field, or undefined if the record has no such field.
     * @throws {SuiteScriptError} SSS_INVALID_API_USAGE in standard mode, if setText or getText was used on the same field
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getValue(options: GetFieldOptions): FieldValue | undefined;
    /** Returns the value of a field, or undefined if the record has no such field. Warning: the fieldId string parameter is an undocumented function overload. */
    getValue(fieldId: string): FieldValue | undefined;
    /**
     * Returns a value indicating whether the associated sublist field has a subrecord on the current line. This method can only be used on dynamic records.
     * @governance none
     * @since 2015.2
     */
    hasCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): boolean;
    /**
     * Returns a value indicating whether the associated sublist field contains a subrecord.
     * @governance none
     * @since 2015.2
     */
    hasSublistSubrecord(options: GetSublistValueOptions): boolean;
    /**
     * Returns a value indicating whether the field contains a subrecord.
     * @governance none
     * @since 2015.2
     */
    hasSubrecord(options: HasSubrecordOptions): boolean;
    /**
     * The internal ID of a specific record.
     *
     * If {@link isNew} is true, this is normally null, but there are exceptions,
     * such as when {@link isNew} is true in the afterSubmit() entrypoint of a user event script.
     * @since 2015.2
     */
    id: number | null;
    /**
     * Inserts a sublist line.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    insertLine(options: InsertLineOptions): this; // Issue #132
    /**
     * Indicates whether the record is in dynamic or standard mode.
     * - If set to true, the record is currently in dynamic mode. If set to false, the record is currently in standard mode.
     *  - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in standard mode, the record’s body fields and sublist line items are not sourced, calculated, and validated until the record is saved (submitted) with Record.save(options).
     *  - When you work with a record in standard mode, you do not need to set values in any particular order. After submitting the record, NetSuite processes the record’s body fields and sublist line items in the correct order, regardless of the organization of your script.
     *  - When a SuiteScript 2.0 script creates, copies, loads, or transforms a record in dynamic mode, the record’s body fields and sublist line items are sourced, calculated, and validated in real-time. A record in dynamic mode emulates the behavior of a record in the UI.
     *  - When you work with a record in dynamic mode, it is important that you set values in the same order you would within the UI. If you fail to do this, your results may not be accurate.
     * This value is set when the record is created or accessed.
     * @since 2015.2
     */
    isDynamic: boolean;
    /** UNDOCUMENTED (as of 2023.1): This value is true when the record is being created. */
    readonly isNew: boolean;
    /** UNDOCUMENTED (as of 2023.1): Returns true if the record form cannot be edited, or false otherwise. */
    readonly isReadOnly: boolean;
    /**
     * Moves one line of the sublist to another location. The sublist machine must allow moving lines, for example: editmachine.setAllowMoveLines(true);.
     * The sublist must contain the _sequence field. The sublist type must be edit machine. When using this method, the order of the other lines is preserved.
     */
    moveLine(options: MoveLineOptions): this;
    /**
     * Removes the subrecord for the associated sublist field on the current line. 
     * @return {Record} same record, for chaining
     * @governance none
     * @since 2015.2
     */
    removeCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): this;
    /**
     * Removes a sublist line.
     * @return {Record} same record, for chaining 
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    removeLine(options: InsertLineOptions): this;
    /**
     * Removes the subrecord for the associated field. 
     * @return {Record} same record, for chaining
     * @governance none
     * @since 2015.2
     */
    removeSubrecord(options: GetFieldOptions): this;
    /**
     * Selects an existing line in a sublist.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    selectLine(options: SelectLineOptions): this;
    // selectLine(sublistId: string, line: number): this; // Deprecated in 2026.1.8
    /**
     * Selects a new line at the end of a sublist.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    selectNewLine(options: RecordGetLineCountOptions): this;
    /**
     * Sets the value for the line currently selected in the matrix.
     * @throws {SuiteScriptError} INVALID_FLD_VALUE if the options.value type does not match the field type
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setCurrentMatrixSublistValue(options: SetCurrentMatrixSublistValueOptions): Record;
    /**
     * Sets the value for the field in the currently selected line by a text representation.
     * @throws {SuiteScriptError} A_SCRIPT_IS_ATTEMPTING_TO_EDIT_THE_1_SUBLIST_THIS_SUBLIST_IS_CURRENTLY_IN_READONLY_MODE_AND_CANNOT_BE_EDITED_CALL_YOUR_NETSUITE_ADMINISTRATOR_TO_DISABLE_THIS_SCRIPT_IF_YOU_NEED_TO_SUBMIT_THIS_RECORD if a user tries to edit a read-only sublist field
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setCurrentSublistText(options: SetCurrentSublistTextOptions): this;
    /**
     * Sets the value for the field in the currently selected line.
     * @throws {SuiteScriptError} A_SCRIPT_IS_ATTEMPTING_TO_EDIT_THE_1_SUBLIST_THIS_SUBLIST_IS_CURRENTLY_IN_READONLY_MODE_AND_CANNOT_BE_EDITED_CALL_YOUR_NETSUITE_ADMINISTRATOR_TO_DISABLE_THIS_SCRIPT_IF_YOU_NEED_TO_SUBMIT_THIS_RECORD if a user tries to edit a read-only sublist field
     * @throws {SuiteScriptError} INVALID_FLD_VALUE if the options.value type does not match the field type
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setCurrentSublistValue(options: SetCurrentSublistValueOptions): this;
    // setCurrentSublistValue(sublistId: string, fieldId: string, value: FieldValue): this;  // Deprecated in 2026.1.8
    /**
     * Sets the value for the associated header in the matrix.
     * @throws {SuiteScriptError} INVALID_FLD_VALUE if the options.value type does not match the field type
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setMatrixHeaderValue(options: SetCurrentMatrixSublistValueOptions): Record;
    /**
     * Sets the value for the associated field in the matrix.
     * @throws {SuiteScriptError} INVALID_FLD_VALUE if the options.value type does not match the field type
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setMatrixSublistValue(options: SetMatrixSublistValueOptions): Record;
    /**
     * Sets the value of the field by a text representation.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setText(options: SetFieldTextOptions): this;
    setText(fieldId: string, value: string): this;
    /**
     * Sets the value of a field.
     * @throws {SuiteScriptError} INVALID_FLD_VALUE if the options.value type does not match the field type
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setValue(options: SetValueOptions): this;
    setValue(fieldId: string, value: Readonly<FieldValue>): this;

    /**
     * The record type.
     * @since 2015.2
     */
    readonly type: Type | `${Type}` | `customrecord${string}` | `customtransaction${string}`;
}

// Exported for other modules to be able to consume this type
/** @since 2015.2 */
export interface Record extends ClientCurrentRecord {
    /**
     * Returns the body field names (internal ids) of all the fields in the record, including machine header field and matrix header fields.
     * @governance none
     * @since 2015.2
     */
    getFields(): string[];
    /**
     * Returns all the names of all the sublists.
     * @governance none
     * @since 2015.2
     */
    getSublists(): string[];
    /**
     * Returns all the field names in a sublist.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getSublistFields(options: RecordGetLineCountOptions): string[];
    /**
     * Gets the subrecord associated with a sublist field.
     * @governance none
     * @since 2015.2
     */
    getSublistSubrecord(options: GetSublistValueOptions): Omit<Record, "save">;
    /**
     * Removes the subrecord for the associated sublist field.
     * @restriction only available in deferred dynamic record
     * @return {Record} same record, for chaining
     * @governance none
     * @since 2015.2
     */
    removeSublistSubrecord(options: GetSublistValueOptions): this;
    /**
     * Submits a new record or saves edits to an existing record. 
     *
     * @return id of submitted record
     * @governance 20 units for transactions, 4 for custom records, 10 for all other records
     * @since 2015.2
     */
    save: RecordSaveFunction;
    /**
     * Sets the value of a sublist field by a text representation.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setSublistText(options: SetSublistTextOptions): Record;
    /**
     * Sets the value of a sublist field. (standard mode only).
     * @throws {SuiteScriptError} INVALID_FLD_VALUE if the options.value type does not match the field type
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
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
    sublists: {[sublistId: string]: {[lineDescription: string]: {[fieldId: string]: string}}}
}

/** The severity of a macro notification, such as { label: 'Information', value: 1 }. */
export interface MacroNotificationSeverity {
    /** The display label of the severity, such as 'Information', 'Warning', or 'Error'. */
    label: string;
    /** The numeric severity. The documented values are 1 (Information), 2 (Warning), and 3 (Error). */
    value: number;
}

/** A notification returned from a macro, such as a limit check result or a confirmation that the macro ran. */
export interface MacroNotification {
    /** The notification title, such as 'Time is within limits'. */
    title: string;
    /** The notification message, such as 'All time records meet their respective rules'. */
    message: string;
    /** The severity of the notification. Not every macro includes it (autoAssignLocations, for example, returns only a title and message). */
    severity?: MacroNotificationSeverity;
}

/**
 * The plain JavaScript object returned from Record.executeMacro(options) and Macro.execute(options).
 *
 * Oracle documents the shape as {notifications: [], response: {}}. The contents of response vary by macro,
 * so use the TResponse type parameter to describe the response for a specific macro.
 *
 * @example
 *  // Shape returned from the weekly timesheet checkTimeLimits macro, as observed in a NetSuite account.
 *  interface CheckTimeLimitsResponse {
 *      result: {
 *          details: { continueWithErrors: boolean, message: string, severity: MacroNotificationSeverity },
 *          notifications: { list: MacroNotification[] }
 *      }
 *  }
 *  const limitCheckResult = timesheet.executeMacro<CheckTimeLimitsResponse>({ id: 'checkTimeLimits', params: { action: 'submit' } });
 *  const canContinue = limitCheckResult.response.result.details.continueWithErrors;
 */
export interface MacroExecuteResult<TResponse = { [key: string]: any }> {
    /** Notifications returned from the macro. This array can be empty, and some macros return their notifications inside response instead. */
    notifications: MacroNotification[];
    /** The macro-specific response data. For example, autoAssignLocations returns { assignedLines: number[] } and copyFromWeek returns {}. */
    response: TResponse;
    /** Returned by some macros (such as autoAssignLocations) in place of notifications and response when the macro fails. */
    error?: string;
}

interface ExecuteMacroOptions {
    /** The macro ID, such as 'calculateTax' or 'checkTimeLimits'. Use Record.getMacros() to see the macros available for a record type. */
    id: string;
    /** The macro arguments. */
    params?: object;
}

interface ExecuteMacroFunction {
    /**
     * Performs a macro operation and returns its result in a plain JavaScript object.
     * @governance none
     * @since 2018.2
     */
    <TResponse = { [key: string]: any }>(options: ExecuteMacroOptions): MacroExecuteResult<TResponse>;
    /** Asynchronously performs a macro operation and returns its result in a plain JavaScript object. */
    promise<TResponse = { [key: string]: any }>(options: ExecuteMacroOptions): Promise<MacroExecuteResult<TResponse>>;
}

interface MacroExecuteFunction {
    /**
     * Executes the macro and returns its result in a plain JavaScript object.
     * @governance none
     * @since 2018.2
     */
    <TResponse = { [key: string]: any }>(options?: { params?: object }): MacroExecuteResult<TResponse>;
    /**
     * Asynchronously executes the macro and returns its result in a plain JavaScript object.
     * @governance none
     * @since 2018.2
     */
    promise<TResponse = { [key: string]: any }>(options?: { params?: object }): Promise<MacroExecuteResult<TResponse>>;
}

/** @since 2018.2 */
interface Macro {
    /**
     * @governance none
     * @since 2018.2
     */
    execute: MacroExecuteFunction;
    /** @since 2018.2 */
    id: string;
    /** @since 2018.2 */
    label: string;
    /** @since 2018.2 */
    description: string;
    /** @since 2018.2 */
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
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     * @since 2015.2
     */
    promise(options: SubmitFieldsOptions): Promise<number>;
}

interface RecordAttachFunction {
    (options: AttachOptions): void;
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: AttachOptions): Promise<void>;
}

interface RecordCopyFunction {
    (options: CopyLoadOptions): Record;
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     * @since 2015.2
     */
    promise(options: CopyLoadOptions): Promise<Record>;
}

export type RecordCreateOptions = Omit<CopyLoadOptions, 'id'>

/**
 * Create a new record object based on provided type
 *
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if options.type is missing
 */
interface RecordCreateFunction {
    (options: RecordCreateOptions): Record;
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     * @since 2015.2
     */
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
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units
     * @since 2015.2
     */
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
    (options: CopyLoadOptions): Record & { id: number };
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     * @since 2015.2
     */
    promise(options: CopyLoadOptions): Promise<Record & { id: number }>;
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
    (options: RecordDeleteOptions): number;
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 20 units for transactions, 4 for custom records, 10 for all other records
     * @since 2015.2
     */
    promise(options: RecordDeleteOptions): Promise<number>;
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
    /**
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     * @since 2015.2
     */
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

/**
 * Attaches a record to another record.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units
 * @since 2015.2
 */
export const attach: RecordAttachFunction;
/**
 * Creates a new record by copying an existing record in NetSuite.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @since 2015.2
 */
export const copy: RecordCopyFunction;
/**
 * Creates a new record.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @since 2015.2
 */
export const create: RecordCreateFunction;
/**
 * Deletes a record.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 20 units for transactions, 4 for custom records, 10 for all other records
 * @since 2015.2
 */
declare const deleteFunc: RecordDeleteFunction;
export { deleteFunc as delete };
/**
 * Detaches a record from another record.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units
 * @since 2015.2
 */
export const detach: RecordDetachFunction;
/**
 * Loads an existing nlobjRecord from the database based on provided type, id
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @since 2015.2
 */
export const load: RecordLoadFunction;
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
 * @restriction only supported for records and fields where DLE (Direct List Editing) is supported
 * @return {number} id of submitted record
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @since 2015.2
 */
export const submitFields: SubmitFieldsFunction;
/**
 * Transforms a record from one type into another, using data from an existing record.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @since 2015.2
 */
export const transform: RecordTransformFunction;

/**
 * N/record.Type enum
 * @since 2015.2
 */
export enum Type { // As of NetSuite 2026.2
    ACCOUNT = 'account',
    ACCOUNTING_BOOK = 'accountingbook',
    ACCOUNTING_CONTEXT = 'accountingcontext',
    ACCOUNTING_PERIOD = 'accountingperiod',
    ADV_INTER_COMPANY_JOURNAL_ENTRY = 'advintercompanyjournalentry',
    ALLOCATION_SCHEDULE = 'allocationschedule',
    AMORTIZATION_SCHEDULE = 'amortizationschedule',
    AMORTIZATION_TEMPLATE = 'amortizationtemplate',
    ANALYTICAL_IMPACT = 'analyticalimpact',
    AS_CHARGED_PROJECT_REVENUE_RULE = 'aschargedprojectrevenuerule',
    ASSEMBLY_BUILD = 'assemblybuild',
    ASSEMBLY_ITEM = 'assemblyitem',
    ASSEMBLY_UNBUILD = 'assemblyunbuild',
    AUTOMATED_CLEARING_HOUSE = 'automatedclearinghouse',
    BALANCE_TRX_BY_SEGMENTS = 'balancetrxbysegments',
    BANKING_STATEMENT = 'bankingstatement',
    BANKING_TRANSACTION = 'bankingtransaction',
    BANK_REC_SUGGESTION = 'bankrecsuggestion',
    BILLING_ACCOUNT = 'billingaccount',
    BILLING_CLASS = 'billingclass',
    BILLING_RATE_CARD = 'billingratecard',
    BILLING_REVENUE_EVENT = 'billingrevenueevent',
    BILLING_SCHEDULE = 'billingschedule',
    BIN = 'bin',
    BIN_TRANSFER = 'bintransfer',
    BIN_WORKSHEET = 'binworksheet',
    BLANKET_PURCHASE_ORDER = 'blanketpurchaseorder',
    BOM = 'bom',
    BOM_REVISION = 'bomrevision',
    BONUS = 'bonus',
    BONUS_TYPE = 'bonustype',
    BUDGET_CATEGORY = 'budgetcategory',
    BUDGET_EXCHANGE_RATE = 'budgetexchangerate',
    BUDGET_IMPORT = 'budgetimport',
    BULK_OWNERSHIP_TRANSFER = 'bulkownershiptransfer',
    BUNDLE_INSTALLATION_SCRIPT = 'bundleinstallationscript',
    CALENDAR_EVENT = 'calendarevent',
    CAMPAIGN = 'campaign',
    CAMPAIGN_AUDIENCE = 'campaignaudience',
    CAMPAIGN_CATEGORY = 'campaigncategory',
    CAMPAIGN_CHANNEL = 'campaignchannel',
    CAMPAIGN_FAMILY = 'campaignfamily',
    CAMPAIGN_OFFER = 'campaignoffer',
    CAMPAIGN_RESPONSE = 'campaignresponse',
    CAMPAIGN_SEARCH_ENGINE = 'campaignsearchengine',
    CAMPAIGN_SUBSCRIPTION = 'campaignsubscription',
    CAMPAIGN_TEMPLATE = 'campaigntemplate',
    CAMPAIGN_VERTICAL = 'campaignvertical',
    CARDHOLDER_AUTHENTICATION = 'cardholderauthentication',
    CASH_REFUND = 'cashrefund',
    CASH_SALE = 'cashsale',
    CHARGE = 'charge',
    CHARGE_PERIOD_SEGMENT = 'chargeperiodsegment',
    CHARGE_RULE = 'chargerule',
    CHECK = 'check',
    CLASSIFICATION = 'classification',
    CLIENT_SCRIPT = 'clientscript',
    CMS_CONTENT = 'cmscontent',
    CMS_CONTENT_TYPE = 'cmscontenttype',
    CMS_PAGE = 'cmspage',
    COMMERCE_CATEGORY = 'commercecategory',
    COMPETITOR = 'competitor',
    CONSOLIDATED_EXCHANGE_RATE = 'consolidatedexchangerate',
    CONTACT = 'contact',
    CONTACT_CATEGORY = 'contactcategory',
    CONTACT_ROLE = 'contactrole',
    COST_CATEGORY = 'costcategory',
    COUPON_CODE = 'couponcode',
    CREDIT_CARD_CHARGE = 'creditcardcharge',
    CREDIT_CARD_REFUND = 'creditcardrefund',
    CREDIT_MEMO = 'creditmemo',
    CURRENCY = 'currency',
    CURRENCY_RATE = 'currencyrate',
    CUSTOMER = 'customer',
    CUSTOMER_CATEGORY = 'customercategory',
    CUSTOMER_DEPOSIT = 'customerdeposit',
    CUSTOMER_HEALTH_OVERVIEW = 'customerhealthoverview',
    CUSTOMER_HEALTH_SCORE = 'customerhealthscore',
    CUSTOMER_MESSAGE = 'customermessage',
    CUSTOMER_PAYMENT = 'customerpayment',
    CUSTOMER_PAYMENT_AUTHORIZATION = 'customerpaymentauthorization',
    CUSTOMER_REFUND = 'customerrefund',
    CUSTOMER_STATUS = 'customerstatus',
    CUSTOMER_SUBSIDIARY_RELATIONSHIP = 'customersubsidiaryrelationship',
    CUSTOM_PURCHASE = 'custompurchase',
    CUSTOM_RECORD = 'customrecord',
    CUSTOM_SALE = 'customsale',
    CUSTOM_TRANSACTION = 'customtransaction',
    DEPARTMENT = 'department',
    DEPOSIT = 'deposit',
    DEPOSIT_APPLICATION = 'depositapplication',
    DESCRIPTION_ITEM = 'descriptionitem',
    DIGITAL_WALLET_CONFIGURATION = 'digitalwalletconfiguration',
    DISCOUNT_ITEM = 'discountitem',
    DOWNLOAD_ITEM = 'downloaditem',
    EMAIL_TEMPLATE = 'emailtemplate',
    EMPLOYEE = 'employee',
    EMPLOYEE_CHANGE_REQUEST = 'employeechangerequest',
    EMPLOYEE_CHANGE_REQUEST_TYPE = 'employeechangerequesttype',
    EMPLOYEE_EXPENSE_SOURCE_TYPE = 'employeeexpensesourcetype',
    EMPLOYEE_STATUS = 'employeestatus',
    EMPLOYEE_TYPE = 'employeetype',
    ENTITY_ACCOUNT_MAPPING = 'entityaccountmapping',
    ENTITY_GROUP = 'entitygroup',
    ESTIMATE = 'estimate',
    EXPENSE = 'expense',
    EXPENSE_AMORTIZATION_EVENT = 'expenseamortizationevent',
    EXPENSE_CATEGORY = 'expensecategory',
    EXPENSE_PLAN = 'expenseplan',
    EXPENSE_REPORT = 'expensereport',
    EXPENSE_REPORT_POLICY = 'expensereportpolicy',
    FAIR_VALUE_FORMULA = 'fairvalueformula',
    FAIR_VALUE_PRICE = 'fairvalueprice',
    FINANCIAL_INSTITUTION = 'financialinstitution',
    FIXED_AMOUNT_PROJECT_REVENUE_RULE = 'fixedamountprojectrevenuerule',
    FOLDER = 'folder',
    FORMAT_PROFILE = 'formatprofile',
    FULFILLMENT_REQUEST = 'fulfillmentrequest',
    GENERAL_TOKEN = 'generaltoken',
    GENERIC_RESOURCE = 'genericresource',
    GIFT_CERTIFICATE = 'giftcertificate',
    GIFT_CERTIFICATE_ITEM = 'giftcertificateitem',
    GL_NUMBERING_SEQUENCE = 'glnumberingsequence',
    GLOBAL_ACCOUNT_MAPPING = 'globalaccountmapping',
    GLOBAL_INVENTORY_RELATIONSHIP = 'globalinventoryrelationship',
    GOAL = 'goal',
    HCM_JOB = 'hcmjob',
    IMPACT_SUBCATEGORY = 'impactsubcategory',
    IMPORTED_EMPLOYEE_EXPENSE = 'importedemployeeexpense',
    INBOUND_SHIPMENT = 'inboundshipment',
    INTERCOMP_ALLOCATION_SCHEDULE = 'intercompallocationschedule',
    INTER_COMPANY_JOURNAL_ENTRY = 'intercompanyjournalentry',
    INTER_COMPANY_TRANSFER_ORDER = 'intercompanytransferorder',
    INVENTORY_ADJUSTMENT = 'inventoryadjustment',
    INVENTORY_COST_REVALUATION = 'inventorycostrevaluation',
    INVENTORY_COUNT = 'inventorycount',
    INVENTORY_DETAIL = 'inventorydetail',
    INVENTORY_ITEM = 'inventoryitem',
    INVENTORY_NUMBER = 'inventorynumber',
    INVENTORY_STATUS = 'inventorystatus',
    INVENTORY_STATUS_CHANGE = 'inventorystatuschange',
    INVENTORY_TRANSFER = 'inventorytransfer',
    INVENTORY_WORKSHEET = 'inventoryworksheet',
    INVOICE = 'invoice',
    INVOICE_GROUP = 'invoicegroup',
    ISSUE = 'issue',
    ISSUE_PRODUCT = 'issueproduct',
    ISSUE_PRODUCT_VERSION = 'issueproductversion',
    ITEM_ACCOUNT_MAPPING = 'itemaccountmapping',
    ITEM_COLLECTION = 'itemcollection',
    ITEM_COLLECTION_ITEM_MAP = 'itemcollectionitemmap',
    ITEM_DEMAND_PLAN = 'itemdemandplan',
    ITEM_FULFILLMENT = 'itemfulfillment',
    ITEM_GROUP = 'itemgroup',
    ITEM_LOCATION_CONFIGURATION = 'itemlocationconfiguration',
    ITEM_PROCESS_FAMILY = 'itemprocessfamily',
    ITEM_PROCESS_GROUP = 'itemprocessgroup',
    ITEM_RECEIPT = 'itemreceipt',
    ITEM_REVISION = 'itemrevision',
    ITEM_SUPPLY_PLAN = 'itemsupplyplan',
    JOB = 'job',
    JOB_STATUS = 'jobstatus',
    JOB_TYPE = 'jobtype',
    JOURNAL_ENTRY = 'journalentry',
    KIT_ITEM = 'kititem',
    LABOR_BASED_PROJECT_REVENUE_RULE = 'laborbasedprojectrevenuerule',
    LEAD = 'lead',
    LEAD_SOURCE = 'leadsource',
    LOCATION = 'location',
    LOT_NUMBERED_ASSEMBLY_ITEM = 'lotnumberedassemblyitem',
    LOT_NUMBERED_INVENTORY_ITEM = 'lotnumberedinventoryitem',
    MANUFACTURING_COST_TEMPLATE = 'manufacturingcosttemplate',
    MANUFACTURING_OPERATION_TASK = 'manufacturingoperationtask',
    MANUFACTURING_ROUTING = 'manufacturingrouting',
    MAP_REDUCE_SCRIPT = 'mapreducescript',
    MARKUP_ITEM = 'markupitem',
    MASSUPDATE_SCRIPT = 'massupdatescript',
    MEM_DOC = 'memdoc',
    MERCHANDISE_HIERARCHY_LEVEL = 'merchandisehierarchylevel',
    MERCHANDISE_HIERARCHY_NODE = 'merchandisehierarchynode',
    MERCHANDISE_HIERARCHY_VERSION = 'merchandisehierarchyversion',
    MESSAGE = 'message',
    MFG_PLANNED_TIME = 'mfgplannedtime',
    NEXUS = 'nexus',
    NON_INVENTORY_ITEM = 'noninventoryitem',
    NOTE = 'note',
    NOTE_TYPE = 'notetype',
    OPPORTUNITY = 'opportunity',
    ORDER_RESERVATION = 'orderreservation',
    ORDER_SCHEDULE = 'orderschedule',
    ORDER_TYPE = 'ordertype',
    OTHER_CHARGE_ITEM = 'otherchargeitem',
    OTHER_NAME = 'othername',
    OTHER_NAME_CATEGORY = 'othernamecategory',
    PARTNER = 'partner',
    PARTNER_CATEGORY = 'partnercategory',
    PAYCHECK = 'paycheck',
    PAYCHECK_INSIGHT_STATEMENT = 'paycheckinsightstatement',
    PAYCHECK_JOURNAL = 'paycheckjournal',
    PAYMENT_ADJUSTMENT = 'paymentadjustment',
    PAYMENT_CARD = 'paymentcard',
    PAYMENT_CARD_TOKEN = 'paymentcardtoken',
    PAYMENT_ITEM = 'paymentitem',
    PAYMENT_METHOD = 'paymentmethod',
    PAYMENT_RUN = 'paymentrun',
    PAYMENT_TOKEN_TYPE = 'paymenttokentype',
    PAYROLL_ITEM = 'payrollitem',
    PCT_COMPLETE_PROJECT_REVENUE_RULE = 'pctcompleteprojectrevenuerule',
    PERFORMANCE_METRIC = 'performancemetric',
    PERFORMANCE_REVIEW = 'performancereview',
    PERFORMANCE_REVIEW_SCHEDULE = 'performancereviewschedule',
    PERIOD_END_JOURNAL = 'periodendjournal',
    PHONE_CALL = 'phonecall',
    PICK_DECOMPOSITION = 'pickdecomposition',
    PICK_STRATEGY = 'pickstrategy',
    PICK_TASK = 'picktask',
    PLANNED_ORDER = 'plannedorder',
    PLANNING_ITEM_CATEGORY = 'planningitemcategory',
    PLANNING_ITEM_GROUP = 'planningitemgroup',
    PLANNING_RULE_GROUP = 'planningrulegroup',
    PLANNING_VIEW = 'planningview',
    PORTLET = 'portlet',
    PRICE_BOOK = 'pricebook',
    PRICE_LEVEL = 'pricelevel',
    PRICE_PLAN = 'priceplan',
    PRICING_GROUP = 'pricinggroup',
    PROJECT_EXPENSE_TYPE = 'projectexpensetype',
    PROJECT_IC_CHARGE_REQUEST = 'projecticchargerequest',
    PROJECT_TASK = 'projecttask',
    PROJECT_TEMPLATE = 'projecttemplate',
    PROMOTION_CODE = 'promotioncode',
    PROSPECT = 'prospect',
    PURCHASE_CONTRACT = 'purchasecontract',
    PURCHASE_ORDER = 'purchaseorder',
    PURCHASE_REQUISITION = 'purchaserequisition',
    REALLOCATE_ITEM = 'reallocateitem',
    RECEIVE_INBOUND_SHIPMENT = 'receiveinboundshipment',
    RESOURCE_ALLOCATION = 'resourceallocation',
    RESOURCE_GROUP = 'resourcegroup',
    RESTLET = 'restlet',
    RETURN_AUTHORIZATION = 'returnauthorization',
    REVENUE_ARRANGEMENT = 'revenuearrangement',
    REVENUE_COMMITMENT = 'revenuecommitment',
    REVENUE_COMMITMENT_REVERSAL = 'revenuecommitmentreversal',
    REVENUE_PLAN = 'revenueplan',
    REV_REC_FIELD_MAPPING = 'revrecfieldmapping',
    REV_REC_SCHEDULE = 'revrecschedule',
    REV_REC_TEMPLATE = 'revrectemplate',
    SAAS_METRIC = 'saasmetric',
    SALES_CAMPAIGN = 'salescampaign',
    SALES_CHANNEL = 'saleschannel',
    SALES_ORDER = 'salesorder',
    SALES_PRICE_RULE = 'salespricerule',
    SALES_PRICE_RULE_ENTRY = 'salespriceruleentry',
    SALES_ROLE = 'salesrole',
    SALES_TAX_ITEM = 'salestaxitem',
    SCHEDULED_SCRIPT = 'scheduledscript',
    SCHEDULED_SCRIPT_INSTANCE = 'scheduledscriptinstance',
    SCRIPT_DEPLOYMENT = 'scriptdeployment',
    SERIALIZED_ASSEMBLY_ITEM = 'serializedassemblyitem',
    SERIALIZED_INVENTORY_ITEM = 'serializedinventoryitem',
    SERVICE_ITEM = 'serviceitem',
    SHIP_ITEM = 'shipitem',
    SITE_CATEGORY = 'sitecategory',
    SOLUTION = 'solution',
    STATISTICAL_JOURNAL_ENTRY = 'statisticaljournalentry',
    STORE_PICKUP_FULFILLMENT = 'storepickupfulfillment',
    SUBSCRIPTION = 'subscription',
    SUBSCRIPTION_CHANGE_ORDER = 'subscriptionchangeorder',
    SUBSCRIPTION_LINE = 'subscriptionline',
    SUBSCRIPTION_PLAN = 'subscriptionplan',
    SUBSCRIPTION_TERM = 'subscriptionterm',
    SUBSIDIARY = 'subsidiary',
    SUBSIDIARY_SETTINGS = 'subsidiarysettings',
    SUBTOTAL_ITEM = 'subtotalitem',
    SUITELET = 'suitelet',
    SUPPLY_CHAIN_SNAPSHOT = 'supplychainsnapshot',
    SUPPLY_CHAIN_SNAPSHOT_SIMULATION = 'supplychainsnapshotsimulation',
    SUPPLY_CHANGE_ORDER = 'supplychangeorder',
    SUPPLY_PLAN_DEFINITION = 'supplyplandefinition',
    SUPPORT_CASE = 'supportcase',
    SUPPORT_CASE_ORIGIN = 'supportcaseorigin',
    SUPPORT_CASE_PRIORITY = 'supportcasepriority',
    SUPPORT_CASE_STATUS = 'supportcasestatus',
    SUPPORT_CASE_TYPE = 'supportcasetype',
    TASK = 'task',
    TAX_ACCT = 'taxacct',
    TAX_ADJUSTMENT_JOURNAL_ENTRY = 'taxadjustmentjournalentry',
    TAX_GROUP = 'taxgroup',
    TAX_LIABILITY_PAYMENT = 'taxliabilitypayment',
    TAX_PERIOD = 'taxperiod',
    TAX_SCHEDULE = 'taxschedule',
    TAX_TYPE = 'taxtype',
    TERM = 'term',
    TIME_BILL = 'timebill',
    TIME_ENTRY = 'timeentry',
    TIME_OFF_CHANGE = 'timeoffchange',
    TIME_OFF_PLAN = 'timeoffplan',
    TIME_OFF_REQUEST = 'timeoffrequest',
    TIME_OFF_RULE = 'timeoffrule',
    TIME_OFF_TYPE = 'timeofftype',
    TIME_SHEET = 'timesheet',
    TOPIC = 'topic',
    TRANSACTION_MATCH = 'transactionmatch',
    TRANSFER_ORDER = 'transferorder',
    UNITS_TYPE = 'unitstype',
    UNLOCKED_TIME_PERIOD = 'unlockedtimeperiod',
    USAGE = 'usage',
    USEREVENT_SCRIPT = 'usereventscript',
    VENDOR = 'vendor',
    VENDOR_AUTOMATED_CLEARING_HOUSE = 'vendorautomatedclearinghouse',
    VENDOR_BILL = 'vendorbill',
    VENDOR_CATEGORY = 'vendorcategory',
    VENDOR_CREDIT = 'vendorcredit',
    VENDOR_PAYMENT = 'vendorpayment',
    VENDOR_PREPAYMENT = 'vendorprepayment',
    VENDOR_PREPAYMENT_APPLICATION = 'vendorprepaymentapplication',
    VENDOR_RETURN_AUTHORIZATION = 'vendorreturnauthorization',
    VENDOR_SUBSIDIARY_RELATIONSHIP = 'vendorsubsidiaryrelationship',
    WAVE = 'wave',
    WBS = 'wbs',
    WEBSITE = 'website',
    WIN_LOSS_REASON = 'winlossreason',
    WORKFLOW_ACTION_SCRIPT = 'workflowactionscript',
    WORK_ORDER = 'workorder',
    WORK_ORDER_CLOSE = 'workorderclose',
    WORK_ORDER_COMPLETION = 'workordercompletion',
    WORK_ORDER_ISSUE = 'workorderissue',
    WORKPLACE = 'workplace',
    ZONE = 'zone'
}
