import type {AddSelectOptionOptions} from './ui/serverWidget';

interface RecordSaveFunction {
    /**
     * Submits a new record or saves edits to an existing record. This method is not available to subrecords.
     * @returns The internal ID of the new or updated record.
     * @governance 20 units for transactions, 4 for custom records, 10 for all other records
     * @since 2015.2
     */
    (options?: SubmitConfig): number;
    /**
     * Submits a new record or saves edits to an existing record asynchronously. Supported in client scripts only.
     * @returns A promise for the internal ID of the new or updated record.
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
    /** The name-value pairs containing attributes for the attachment, such as `{ role: 3 }` when attaching a contact. By default, this value is null. */
    attributes?: {[attribute: string]: FieldValue};
}

interface AttachRecordOptions {
    /** The record type. Set this value using the record.Type enum. To attach a file from the File Cabinet, set this value to 'file'. */
    type: Type | string;
    /** The internal ID of the record. */
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
    /** Name-value pairs containing default values of fields in the new record. By default, this value is null. See "N/record Default Values" in the Help Center. */
    defaultValues?: {[fieldId: string]: FieldValue};
}

interface DetachOptions {
    /** The record to be detached. */
    record: AttachRecordOptions;
    /** The destination record that options.record should be detached from. */
    from: AttachRecordOptions;
    /** Name-value pairs containing attributes for the detachment. By default, this value is null. */
    attributes?: {[attribute: string]: FieldValue};
}

interface FindSublistLineWithValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The value to search for. */
    value: FieldValue;
}

interface FindMatrixSublistLineWithValueOptions {
    /** The internal ID of the sublist that contains the matrix. */
    sublistId: string;
    /** The internal ID of the matrix field. */
    fieldId: string;
    /** The value to search for. */
    value: FieldValue;
    /** The column number of the field. Note that column indexing begins at 0 with SuiteScript 2.x. */
    column: number;
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

interface GetCurrentSublistTextOptions extends GetCurrentSublistValueOptions {
    /**
     * Indicates whether to perform field sourcing synchronously. If set to true, sources dependent field information for empty fields synchronously.
     * Defaults to false - dependent field values are not sourced synchronously.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean;
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
    /** The column number for the field. Note that column indexing begins at 0 with SuiteScript 2.x. */
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
    /** The line number to insert. Note that line indexing begins at 0 with SuiteScript 2.x. */
    line: number;
    /** If set to true, scripting recalculation is ignored. Default is false. */
    ignoreRecalc?: boolean;
}

interface RemoveLineOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The line number of the sublist to remove. Note that line indexing begins at 0 with SuiteScript 2.x. */
    line: number;
    /** If set to true, scripting recalculation is ignored. Default is false. */
    ignoreRecalc?: boolean;
    /** The line instance ID. Use this parameter to specify where to remove the line. Documented for N/record only. */
    lineInstanceId?: string;
}

interface MoveLineOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The line number of the line to move. */
    from: number;
    /** The line number to move the line to. */
    to: number;
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
    /**
     * Set to true to synchronously set this value and its sourced values before returning.
     * @deprecated Not documented by Oracle. Use forceSyncSourcing instead.
     */
    fireSlavingSync?: boolean;
    /**
     * Indicates whether to perform field sourcing synchronously. If set to true, sources dependent field information for empty fields synchronously.
     * Defaults to false - dependent field values are not sourced synchronously.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean;
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
    value: FieldValue;
    /**
     * Set to true to synchronously set this value and its sourced values before returning.
     * @deprecated Not documented by Oracle. Use forceSyncSourcing instead.
     */
    fireSlavingSync?: boolean;
    /**
     * Indicates whether to perform field sourcing synchronously. If set to true, sources dependent field information for empty fields synchronously.
     * Defaults to false - dependent field values are not sourced synchronously.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean;
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
    /**
     * Set to true to synchronously set this value and its sourced values before returning.
     * @deprecated Not documented by Oracle. Use forceSyncSourcing instead.
     */
    fireSlavingSync?: boolean;
    /**
     * Indicates whether to perform field sourcing synchronously. If set to true, sources dependent field information for empty fields synchronously.
     * Defaults to false - dependent field values are not sourced synchronously.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean;
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
    /**
     * Set to true to synchronously set this value and its sourced values before returning.
     * @deprecated Not documented by Oracle. Use forceSyncSourcing instead.
     */
    fireSlavingSync?: boolean;
    /**
     * Indicates whether to perform field sourcing synchronously. If set to true, sources dependent field information for empty fields synchronously.
     * Defaults to false - dependent field values are not sourced synchronously.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean;
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
    value: FieldValue;
    /** If set to true, the field change and slaving event is ignored. */
    ignoreFieldChange?: boolean;
    /**
     * Set to true to synchronously set this value and its sourced values before returning.
     * @deprecated Not documented by Oracle. Use forceSyncSourcing instead.
     */
    fireSlavingSync?: boolean;
    /**
     * Indicates whether to perform field sourcing synchronously. If set to true, sources dependent field information for empty fields synchronously.
     * Defaults to false - dependent field values are not sourced synchronously.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean;
}

interface SetFieldTextOptions {
    /** The internal ID of a standard or custom body field. */
    fieldId: string;
    /**
     * The text or texts to change the field value to.
     * For multiselect fields, this accepts an array of strings, or null to deselect all currently selected values.
     */
    text: string | string[] | null;
    /** If set to true, the field change and slaving event is ignored. Default is false. */
    ignoreFieldChange?: boolean;
    /**
     * Set to true to synchronously set this value and its sourced values before returning.
     * @deprecated Not documented by Oracle. Use forceSyncSourcing instead.
     */
    fireSlavingSync?: boolean;
    /**
     * Indicates whether to perform field sourcing synchronously. If set to true, sources dependent field information for empty fields synchronously.
     * Defaults to false - dependent field values are not sourced synchronously.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean;
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
    /**
     * Set to true to synchronously set this value and its sourced values before returning.
     * @deprecated Not documented by Oracle. Use forceSyncSourcing instead.
     */
    fireSlavingSync?: boolean;
    /**
     * Indicates whether to perform field sourcing synchronously. If set to true, sources dependent field information for empty fields synchronously.
     * Defaults to false - dependent field values are not sourced synchronously.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean;
}

interface SetSublistValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The line number of the sublist. Note that line indexing begins at 0 with SuiteScript 2.x. */
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
    /**
     * Set to true to synchronously set this value and its sourced values before returning.
     * @deprecated Not documented by Oracle. Use forceSyncSourcing instead.
     */
    fireSlavingSync?: boolean;
    /**
     * Indicates whether to perform field sourcing synchronously. If set to true, sources dependent field information for empty fields synchronously.
     * Defaults to false - dependent field values are not sourced synchronously.
     * @since 2019.1
     */
    forceSyncSourcing?: boolean;
}

interface GetSelectOptionsOpts {
    /** The search string to filter the select options that are returned. Filter values are case insensitive. */
    filter: string;
    /** The following operators are supported: contains, is, startswith. Default is contains. */
    operator: "contains" | "is" | "startswith";
}

/**
 * Encapsulates a sublist on a standard or custom record.
 * Supported script types: Client and server scripts.
 * @since 2015.2
 */
export interface Sublist {
    /** UNDOCUMENTED: The name of the sublist. */
    name: string;
    /**
     * Returns the internal ID of the sublist.
     * @since 2015.2
     */
    readonly id: string;
    /**
     * Returns the sublist type.
     * @since 2015.2
     */
    readonly type: string;
    /**
     * Indicates whether the sublist has changed on the record form.
     * @since 2015.2
     */
    readonly isChanged: boolean;
    /** UNDOCUMENTED: Indicates whether the sublist is hidden. */
    isHidden: boolean;
    /**
     * Indicates whether the sublist is displayed on the record form.
     * Oracle's N/currentRecord page lists this property as read-only, but the N/record page lists it as boolean without that restriction.
     * @since 2015.2
     */
    isDisplay: boolean;
    /** UNDOCUMENTED: Indicates whether the sublist supports the multi-line buffer feature. */
    isMultilineEditable: boolean;
    /**
     * Returns a column in the sublist.
     * Oracle's N/record page lists the return type as record.Column, but the N/currentRecord page lists it as currentRecord.Column or null,
     * and the N/record example checks the result for null. Check for null if the column might not exist.
     * @governance none
     * @since 2015.2
     */
    getColumn(options: GetColumnOptions): Column;
    /** Returns the object type name (sublist.Sublist). */
    toString(): string;
    /** JSON.stringify() implementation. */
    toJSON(): {id: string, type: string, isChanged: boolean, isDisplay: boolean};
}

export interface GetColumnOptions {
    /** The internal ID of the column field in the sublist. */
    fieldId: string;
}

/**
 * Encapsulates a column of a sublist on a standard or custom record.
 * This object does not return a value, it returns information about the sublist column.
 * Supported script types: Client and server scripts.
 * @since 2015.2
 */
export interface Column {
    /**
     * Returns the internal ID of the column.
     * @since 2015.2
     */
    readonly id: string;
    /**
     * Returns the column type.
     * @since 2015.2
     */
    readonly type: string;
    /**
     * Returns the UI label for the column.
     * @since 2015.2
     */
    readonly label: string;
    /**
     * Returns the internal ID of the standard or custom sublist that contains the column.
     * @since 2015.2
     */
    readonly sublistId: string;
    /**
     * Indicates whether the column is disabled.
     * @since 2020.2
     */
    isDisabled: boolean;
    /**
     * Indicates whether the column is displayed.
     * @since 2020.2
     */
    readonly isDisplay: boolean;
    /**
     * Indicates whether the column is required.
     * @since 2020.2
     */
    isMandatory: boolean;
    /**
     * Indicates whether the column is sortable.
     * @since 2020.2
     */
    readonly isSortable: boolean;
}

/** A select option returned by Field.getSelectOptions(options), such as `{value: 5, text: 'abc'}`. */
export interface FieldSelectOption {
    /** The internal ID of the option. Oracle does not document the type; its example shows numbers. */
    value: string | number;
    /** The display text of the option. */
    text: string;
}

/**
 * Encapsulates a body or sublist field on a standard or custom record.
 * Supported script types: Client and server scripts.
 * @since 2015.2
 */
export interface Field {
    /**
     * Inserts an option into certain types of select and multiselect fields.
     * Usable only on select and multiselect fields that were added by a front-end Suitelet or beforeLoad user event script (IDs that begin with custpage).
     * Documented for N/currentRecord (client scripts) only.
     * @throws {SuiteScriptError} SSS_INVALID_UI_OBJECT_TYPE if a script uses this method on the wrong type of field
     * @governance none
     * @since 2016.2
     */
    insertSelectOption(options: AddSelectOptionOptions): void;
    /**
     * Obtains an array of available options on a dropdown select, multi-select, or radio field, in the format `[{value: 5, text: 'abc'},{value: 6, text: '123'}]`.
     * You can use this method only on a record in dynamic mode. The maximum number of options returned is 500.
     *
     * Oracle documents that this method returns null (not an array) for fields that are not dropdown select fields, such as popup select fields
     * or fields that do not exist on the form, and returns a Type Error if the field is not supported.
     * @governance none
     * @since 2015.2
     */
    getSelectOptions(options?: GetSelectOptionsOpts): FieldSelectOption[] | null;
    /**
     * Removes an option from certain types of select and multiselect fields.
     * Usable only on select and multiselect fields that were added by a front-end Suitelet or beforeLoad user event script (IDs that begin with custpage).
     * Set options.value to null to remove all options from the list.
     * Documented for N/currentRecord (client scripts) only.
     * @throws {SuiteScriptError} SSS_INVALID_UI_OBJECT_TYPE if a script uses this method on the wrong type of field
     * @governance none
     * @since 2016.2
     */
    removeSelectOption(options: { value: string | null }): void;
    /** Returns the JSON representation of the field. */
    toJSON(): {id: string, label: string, type: string};
    /** Returns the object type name. */
    toString(): string;
    /**
     * Returns the UI label for a standard or custom field body or sublist field.
     * @since 2015.2
     */
    readonly label: string;
    /**
     * Returns the internal ID of a standard or custom body or sublist field.
     * @since 2015.2
     */
    readonly id: string;
    /**
     * Returns the type of a body or sublist field.
     * @since 2015.2
     */
    readonly type: string;
    /**
     * Returns true if the standard or custom field is required on the record form, or false otherwise.
     * @since 2015.2
     */
    isMandatory: boolean;
    /**
     * Returns true if the standard or custom field is disabled on the record form, or false otherwise. Documented for N/currentRecord only.
     * @since 2016.2
     */
    isDisabled: boolean;
    /**
     * Returns true if the field is a popup list field, or false otherwise. Documented for N/currentRecord only.
     * @since 2016.2
     */
    readonly isPopup: boolean;
    /**
     * Returns true if the field is set to display on the record form, or false otherwise.
     * In N/record, this property is available only when working with a record in dynamic mode. It is read-only for sublist fields.
     * @since 2015.2
     */
    isDisplay: boolean;
    /**
     * Returns true if the field is visible on the record form, or false otherwise. Documented for N/currentRecord only.
     * @since 2016.2
     */
    readonly isVisible: boolean;
    /**
     * Returns true if the field on the record form cannot be edited, or false otherwise. Documented for N/currentRecord only.
     * For textarea fields, this property can be read or written to. For all other fields, this property is read-only.
     * @since 2016.2
     */
    isReadOnly: boolean;
    /**
     * Returns the ID of the sublist associated with the specified sublist field.
     * In N/record, this property is available only when working with a record in dynamic mode.
     * @since 2015.2
     */
    readonly sublistId: string;
}

export type FieldValue = Date | number | number[] | string | string[] | boolean | null;

/**
 * The members shared by record.Record (N/record) and currentRecord.CurrentRecord (N/currentRecord).
 * Almost like a full Record, except without things like save().
 * The @since values on these members are for N/record. Oracle lists the N/currentRecord equivalents as since 2016.2.
 */
export interface ClientCurrentRecord {
    /**
     * Cancels the currently selected line on a sublist.
     * @returns The record object that called the method.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    cancelLine(options: CancelCommitLineOptions): this;
    // cancelLine(sublistId: string): Record; // Deprecated in 2026.1.8
    /**
     * Commits the currently selected line on a sublist.
     * @returns The record object that called the method.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    commitLine(options: CommitLineOptions): this;
    copy: RecordCopyFunction;
    /**
     * Performs macro operation and returns its result in a plain JavaScript object.
     * Oracle documents the return value as an object with the macro results or null.
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
    findMatrixSublistLineWithValue(options: FindMatrixSublistLineWithValueOptions): number;
    /**
     * Returns the line number for the first occurrence of a field value in a sublist.
     * @returns The line number, or -1 if not found.
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
     * Returns a field object from a sublist current line. Only available in dynamic mode.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2016.2
     */
    getCurrentSublistField(options: GetCurrentSublistFieldOptions): Field;
    /**
     * Returns the line number of the currently selected line.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getCurrentSublistIndex(options: RecordGetLineCountOptions): number;
    /**
     * Gets the subrecord for the associated sublist field on the current line. (dynamic mode only)
     * @governance none
     * @since 2015.2
     */
    getCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): Record;
    /**
     * Returns a text representation of the field value in the currently selected line.
     * Oracle documents that multiselect fields return an array; this declaration returns string for compatibility with existing code.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getCurrentSublistText(options: GetCurrentSublistTextOptions): string;
    /**
     * Returns the value of a sublist field on the currently selected sublist line.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getCurrentSublistValue(options: GetCurrentSublistValueOptions): FieldValue;
    // getCurrentSublistValue(sublistId: string, fieldId: string): FieldValue; // Deprecated in 2026.1.8
    /**
     * Returns a field object from a record.
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
     * Provides a macro to execute. The returned record.Macro can be called directly, like a function.
     * @returns Function to be executed for the macro.
     * @throws {SuiteScriptError} SSS_INVALID_MACRO_ID if a macro does not exist on the record
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is missing
     * @governance none
     * @since 2018.2
     */
    getMacro(options: { id: string }): Macro;
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
     * Gets the field for the specified header in the matrix.
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
     * Returns the specified sublist.
     * @governance none
     * @since 2015.2
     */
    getSublist(options: RecordGetLineCountOptions): Sublist;
    /**
     * Returns a field object from a sublist.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getSublistField(options: GetSublistFieldOptions): Field;
    /**
     * Returns the value of a sublist field in a text representation.
     * Oracle documents that multiselect fields return an array; this declaration returns string for compatibility with existing code.
     * @throws {SuiteScriptError} SSS_INVALID_API_USAGE in standard mode, if getSublistText is used before setSublistText on a new record, or after setSublistValue on a loaded record, for the same field
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getSublistText(options: GetSublistValueOptions): string;
    /**
     * Returns the value of a sublist field.
     * @throws {SuiteScriptError} SSS_INVALID_API_USAGE if invoked prior to using setSublistValue in standard record mode
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getSublistValue(options: GetSublistValueOptions): FieldValue;
    // getSublistValue(sublistId: string, fieldId: string, line: number): FieldValue; // Deprecated in 2026.1.8
    /**
     * Gets the subrecord for the associated field. This method is not available for subrecords.
     * @throws {SuiteScriptError} FIELD_1_IS_DISABLED_YOU_CANNOT_APPLY_SUBRECORD_OPERATION_ON_THIS_FIELD if the specified field is disabled
     * @throws {SuiteScriptError} FIELD_1_IS_NOT_A_SUBRECORD_FIELD if the specified field is not a subrecord field
     * @throws {SuiteScriptError} SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION if the specified fieldId does not refer to a subrecord (documented for N/currentRecord only)
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getSubrecord(options: GetFieldOptions): Omit<Record, "save">;
    /**
     * Returns the text representation of a field value. For multiselect fields, returns an array.
     * @throws {SuiteScriptError} SSS_INVALID_API_USAGE in certain cases in standard mode, such as calling getText on a field before setting it with setText on a new record, or after setValue on a loaded record
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getText(options: GetFieldOptions): string | string[];
    /** Returns the text representation of a field value. Warning: this is an undocumented function overload. */
    getText(fieldId: string): string | string[];
    /**
     * Returns the value of a field. Not to be used on custom password fields; use crypto.checkPasswordField(options) instead.
     * Date and date/time fields return a JavaScript Date object; use getText(options) to get a string.
     * @throws {SuiteScriptError} SSS_INVALID_API_USAGE in standard mode, if setText or getText was used on the same field
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    getValue(options: GetFieldOptions): FieldValue;
    /** Returns the value of a field. Warning: the fieldId string parameter is an undocumented function overload. */
    getValue(fieldId: string): FieldValue;
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
     * This property is not available to subrecords.
     * @since 2015.2
     */
    readonly id: number | null;
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
    readonly isDynamic: boolean;
    /** UNDOCUMENTED (as of 2023.1): This value is true when the record is being created. */
    readonly isNew: boolean;
    /** UNDOCUMENTED (as of 2023.1): Returns true if the record form cannot be edited, or false otherwise. */
    readonly isReadOnly: boolean;
    /**
     * UNDOCUMENTED: Moves one line of the sublist to another location. The sublist machine must allow moving lines, for example: editmachine.setAllowMoveLines(true);.
     * The sublist must contain the _sequence field. The sublist type must be edit machine. When using this method, the order of the other lines is preserved.
     */
    moveLine(options: MoveLineOptions): this;
    /**
     * Removes the subrecord for the associated sublist field on the current line.
     * @returns The record object that called the method.
     * @governance none
     * @since 2015.2
     */
    removeCurrentSublistSubrecord(options: GetCurrentSublistValueOptions): this;
    /**
     * Removes a sublist line.
     * @returns The record object that called the method.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    removeLine(options: RemoveLineOptions): this;
    /**
     * Removes the subrecord for the associated field.
     * @returns The record object that called the method.
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
    setCurrentMatrixSublistValue(options: SetCurrentMatrixSublistValueOptions): this;
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
    setMatrixHeaderValue(options: SetCurrentMatrixSublistValueOptions): this;
    /**
     * Sets the value for the associated field in the matrix.
     * @throws {SuiteScriptError} INVALID_FLD_VALUE if the options.value type does not match the field type
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setMatrixSublistValue(options: SetMatrixSublistValueOptions): this;
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
    setValue(fieldId: string, value: FieldValue): this;

    /**
     * The record type. This property is not available to subrecords.
     * @since 2015.2
     */
    readonly type: Type | `${Type}`;
}

/**
 * Encapsulates a NetSuite record.
 * Supported script types: Client and server scripts.
 * @since 2015.2
 */
// Exported for other modules to be able to consume this type
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
     * Gets the subrecord associated with a sublist field. (standard mode only)
     * @governance none
     * @since 2015.2
     */
    getSublistSubrecord(options: GetSublistValueOptions): Omit<Record, "save">;
    /**
     * Removes the subrecord for the associated sublist field. (standard mode only)
     * @returns The record object that called the method.
     * @governance none
     * @since 2015.2
     */
    removeSublistSubrecord(options: GetSublistValueOptions): this;
    /**
     * Submits a new record or saves edits to an existing record. This method is not available to subrecords.
     * In standard mode, you must submit and then load the record to obtain sourced, validated, and calculated field values.
     * The promise version is supported in client scripts only.
     * @returns The internal ID of the new or updated record.
     * @governance 20 units for transactions, 4 for custom records, 10 for all other records
     * @since 2015.2
     */
    save: RecordSaveFunction;
    /**
     * Sets the value of a sublist field by a text representation. (standard mode only)
     * @returns The record object that called the method.
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setSublistText(options: SetSublistTextOptions): this;
    /**
     * Sets the value of a sublist field. (standard mode only)
     * @returns The record object that called the method.
     * @throws {SuiteScriptError} INVALID_FLD_VALUE if the options.value type does not match the field type
     * @throws {SuiteScriptError} SSS_INVALID_SUBLIST_OPERATION if a required argument is invalid or the sublist is not editable
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance none
     * @since 2015.2
     */
    setSublistValue(options: SetSublistValueOptions): this;
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
    /** UNDOCUMENTED: Oracle does not document a promise version of Record.executeMacro(options). Asynchronously performs a macro operation and returns its result in a plain JavaScript object. */
    promise<TResponse = { [key: string]: any }>(options: ExecuteMacroOptions): Promise<MacroExecuteResult<TResponse>>;
}

interface MacroExecuteFunction {
    /**
     * Executes the macro and returns its result in a plain JavaScript object, in the form `{notifications: [], response: {}}`.
     * @governance none
     * @since 2018.2
     */
    <TResponse = { [key: string]: any }>(options?: { params?: object }): MacroExecuteResult<TResponse>;
    /**
     * Asynchronously executes the macro and returns its result in a plain JavaScript object. Supported in client scripts only.
     * @governance none
     * @since 2018.2
     */
    promise<TResponse = { [key: string]: any }>(options?: { params?: object }): Promise<MacroExecuteResult<TResponse>>;
}

/**
 * Encapsulates a NetSuite record macro. Returned by Record.getMacro(options) and Record.getMacros().
 * A Macro can be called directly, like a function: `macro(options)` and `macro.promise(options)` are equivalent to `macro.execute(options)` and `macro.execute.promise(options)`.
 * Supported script types: Client and server scripts. The promise versions are supported in client scripts only.
 * @since 2018.2
 */
export interface Macro extends MacroExecuteFunction {
    /**
     * Performs a macro operation and returns its result in an object.
     * @governance none
     * @since 2018.2
     */
    execute: MacroExecuteFunction;
    /**
     * The ID of the macro. For a list of macro IDs, see Supported Record Macros.
     * @since 2018.2
     */
    id: string;
    /**
     * The macro label.
     * @since 2018.2
     */
    label: string;
    /**
     * The macro description.
     * @since 2018.2
     */
    description: string;
    /**
     * The macro defined attributes.
     * @since 2018.2
     */
    attributes: {[attribute: string]: unknown};
}

interface SubmitConfig {
    /**
     * Indicates whether to enable sourcing during the record update.
     * Defaults to true for record.submitFields(options), and to false for Record.save(options).
     * For Record.save(options), this applies to records in standard mode only; in dynamic mode, field values are always sourced.
     */
    enableSourcing?: boolean;
    /**
     * Indicates whether to ignore required fields during record submission. Default is false.
     * Use with caution; this argument should be used mostly with scheduled scripts, rather than user event scripts.
     */
    ignoreMandatoryFields?: boolean;
}

export interface SubmitFieldsOptions {
    /** The record type. Use the record.Type enum for standard records, or the custom record type's string ID for custom records. */
    type: Type | string;
    /** The internal ID of the existing record instance in NetSuite. */
    id: string | number;
    /**
     * The ID-value pairs for each field you want to edit and submit, such as `{ memo: 'Bob', department: '12' }`.
     * The value type must correspond to the field type being set. For example:
     * - Text, Radio, Select and Multi-Select fields accept string values.
     * - Checkbox fields accept boolean values.
     * - Date and DateTime fields accept Date values.
     * - Integer, Float, Currency and Percent fields accept number values.
     */
    values: {[fieldId: string]: FieldValue};
    /** Additional options to set for the record. */
    options?: SubmitConfig;
}

interface SubmitFieldsFunction {
    (options: SubmitFieldsOptions): number;
    /**
     * The promise version of record.submitFields(options). Supported in client scripts only.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     * @since 2015.2
     */
    promise(options: SubmitFieldsOptions): Promise<number>;
}

interface RecordAttachFunction {
    (options: AttachOptions): void;
    /**
     * The promise version of record.attach(options). Supported in client scripts only.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: AttachOptions): Promise<void>;
}

interface RecordCopyFunction {
    (options: CopyLoadOptions): Record;
    /**
     * The promise version of record.copy(options). Supported in client scripts only.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     * @since 2015.2
     */
    promise(options: CopyLoadOptions): Promise<Record>;
}

export type RecordCreateOptions = Omit<CopyLoadOptions, 'id'>

interface RecordCreateFunction {
    (options: RecordCreateOptions): Record;
    /**
     * The promise version of record.create(options). Supported in client scripts only.
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
     * The promise version of record.detach(options). Supported in client scripts only.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units
     * @since 2015.2
     */
    promise(options: DetachOptions): Promise<void>;
}

interface RecordLoadFunction {
    (options: CopyLoadOptions): Record & { id: number };
    /**
     * The promise version of record.load(options). Supported in client scripts only.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 10 units for transactions, 2 for custom records, 5 for all other records
     * @since 2015.2
     */
    promise(options: CopyLoadOptions): Promise<Record & { id: number }>;
}

interface RecordDeleteFunction {
    (options: RecordDeleteOptions): number;
    /**
     * The promise version of record.delete(options). Supported in client scripts only.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
     * @governance 20 units for transactions, 4 for custom records, 10 for all other records
     * @since 2015.2
     */
    promise(options: RecordDeleteOptions): Promise<number>;
}

interface RecordTransformFunction {
    (options: RecordTransformOptions): Record;
    /**
     * The promise version of record.transform(options). Supported in client scripts only.
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
    /** If set to true, the new record is created in dynamic mode. If set to false, the new record is created in standard mode. By default, this value is false. */
    isDynamic?: boolean;
    /** Name-value pairs containing default values of fields in the new record. By default, this value is null. See "N/record Default Values" in the Help Center. */
    defaultValues?: {[fieldId: string]: FieldValue};
}

/**
 * Attaches a record to another record.
 * Supported script types: Client and server scripts. The promise version is supported in client scripts only.
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units
 * @since 2015.2
 */
export const attach: RecordAttachFunction;
/**
 * Creates a new record by copying an existing record in NetSuite.
 * Supported script types: Client and server scripts. The promise version is supported in client scripts only.
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @since 2015.2
 */
export const copy: RecordCopyFunction;
/**
 * Creates a new record. For some record types, some default values are required (for example, script on a script deployment). See "N/record Default Values".
 * Supported script types: Client and server scripts. The promise version is supported in client scripts only.
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @since 2015.2
 */
export const create: RecordCreateFunction;
/**
 * Deletes a record and returns the internal ID of the deleted record.
 * Supported script types: Client and server scripts. The promise version is supported in client scripts only.
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 20 units for transactions, 4 for custom records, 10 for all other records
 * @since 2015.2
 */
declare const deleteFunc: RecordDeleteFunction;
export { deleteFunc as delete };
/**
 * Detaches a record from another record.
 * Supported script types: Client and server scripts. The promise version is supported in client scripts only.
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units
 * @since 2015.2
 */
export const detach: RecordDetachFunction;
/**
 * Loads an existing record. The maximum number of lines on a record's sublist is limited to 10,000.
 * Supported script types: Client and server scripts. The promise version is supported in client scripts only.
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @since 2015.2
 */
export const load: RecordLoadFunction;
/**
 * Updates and submits one or more body fields on an existing record in NetSuite, and returns the internal ID of the parent record.
 * When you use this method, you do not need to load or submit the parent record.
 * You can use this method to edit and submit the following:
 * - Standard body fields that support inline editing (direct list editing). For more information, see Using Inline Editing.
 * - Custom body fields that support inline editing.
 * - Select and multi-select fields.
 * You cannot use this method to edit and submit the following:
 * - Sublist line item fields
 * - Subrecord fields (for example, address fields)
 * Only supported for records and fields where DLE (Direct List Editing) is supported.
 * Supported script types: Client and server scripts. The promise version is supported in client scripts only.
 *
 * @returns The internal ID of the parent record.
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @since 2015.2
 */
export const submitFields: SubmitFieldsFunction;
/**
 * Transforms a record from one type into another, using data from an existing record (for example, sales order to invoice, or opportunity to estimate).
 * For a list of supported transformations, see Supported Transformation Types.
 * Supported script types: Client and server scripts. The promise version is supported in client scripts only.
 *
 * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required argument is missing or undefined
 * @governance 10 units for transactions, 2 for custom records, 5 for all other records
 * @since 2015.2
 */
export const transform: RecordTransformFunction;

/**
 * N/record.Type enum. Holds the string values for supported record types.
 * For an instance of a custom record type, use the custom record type's string ID instead.
 * @since 2015.2
 */
export enum Type { // Matches Oracle's record.Type values as of 2026.2
    ACCOUNT = 'account',
    ACCOUNTING_BOOK = 'accountingbook',
    ACCOUNTING_CONTEXT = 'accountingcontext',
    ACCOUNTING_PERIOD = 'accountingperiod',
    ADV_INTER_COMPANY_JOURNAL_ENTRY = 'advintercompanyjournalentry',
    ALLOCATION_SCHEDULE = 'allocationschedule',
    AMORTIZATION_SCHEDULE = 'amortizationschedule',
    AMORTIZATION_TEMPLATE = 'amortizationtemplate',
    ASSEMBLY_BUILD = 'assemblybuild',
    ASSEMBLY_ITEM = 'assemblyitem',
    ASSEMBLY_UNBUILD = 'assemblyunbuild',
    AUTOMATED_CLEARING_HOUSE = 'automatedclearinghouse',
    BALANCE_TRX_BY_SEGMENTS = 'balancetrxbysegments',
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
    BUDGET_EXCHANGE_RATE = 'budgetexchangerate',
    BULK_OWNERSHIP_TRANSFER = 'bulkownershiptransfer',
    BUNDLE_INSTALLATION_SCRIPT = 'bundleinstallationscript',
    CALENDAR_EVENT = 'calendarevent',
    CAMPAIGN = 'campaign',
    CAMPAIGN_RESPONSE = 'campaignresponse',
    CAMPAIGN_TEMPLATE = 'campaigntemplate',
    CARDHOLDER_AUTHENTICATION = 'cardholderauthentication',
    CASH_REFUND = 'cashrefund',
    CASH_SALE = 'cashsale',
    CHARGE = 'charge',
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
    CUSTOMER = 'customer',
    CUSTOMER_CATEGORY = 'customercategory',
    CUSTOMER_DEPOSIT = 'customerdeposit',
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
    ESTIMATE = 'estimate',
    EXPENSE_AMORTIZATION_EVENT = 'expenseamortizationevent',
    EXPENSE_CATEGORY = 'expensecategory',
    EXPENSE_PLAN = 'expenseplan',
    EXPENSE_REPORT = 'expensereport',
    EXPENSE_REPORT_POLICY = 'expensereportpolicy',
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
    /** Not listed in Oracle's record.Type documentation as of 2026.2. */
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
    PAYCHECK_JOURNAL = 'paycheckjournal',
    PAYMENT_CARD = 'paymentcard',
    PAYMENT_CARD_TOKEN = 'paymentcardtoken',
    PAYMENT_ITEM = 'paymentitem',
    PAYMENT_METHOD = 'paymentmethod',
    PAYROLL_ITEM = 'payrollitem',
    PCT_COMPLETE_PROJECT_REVENUE_RULE = 'pctcompleteprojectrevenuerule',
    PERFORMANCE_METRIC = 'performancemetric',
    PERFORMANCE_REVIEW = 'performancereview',
    PERFORMANCE_REVIEW_SCHEDULE = 'performancereviewschedule',
    PERIOD_END_JOURNAL = 'periodendjournal',
    PHONE_CALL = 'phonecall',
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
    RESTLET = 'restlet',
    RETURN_AUTHORIZATION = 'returnauthorization',
    REVENUE_ARRANGEMENT = 'revenuearrangement',
    REVENUE_COMMITMENT = 'revenuecommitment',
    REVENUE_COMMITMENT_REVERSAL = 'revenuecommitmentreversal',
    REVENUE_PLAN = 'revenueplan',
    /** Not listed in Oracle's record.Type documentation as of 2026.2. */
    REV_REC_FIELD_MAPPING = 'revrecfieldmapping',
    REV_REC_SCHEDULE = 'revrecschedule',
    REV_REC_TEMPLATE = 'revrectemplate',
    SALES_CHANNEL = 'saleschannel',
    SALES_ORDER = 'salesorder',
    SALES_ROLE = 'salesrole',
    SALES_TAX_ITEM = 'salestaxitem',
    SCHEDULED_SCRIPT = 'scheduledscript',
    SCHEDULED_SCRIPT_INSTANCE = 'scheduledscriptinstance',
    SCRIPT_DEPLOYMENT = 'scriptdeployment',
    SERIALIZED_ASSEMBLY_ITEM = 'serializedassemblyitem',
    SERIALIZED_INVENTORY_ITEM = 'serializedinventoryitem',
    SERVICE_ITEM = 'serviceitem',
    SHIP_ITEM = 'shipitem',
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
    TASK = 'task',
    TAX_ACCT = 'taxacct',
    TAX_GROUP = 'taxgroup',
    TAX_PERIOD = 'taxperiod',
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
    TRANSFER_ORDER = 'transferorder',
    UNITS_TYPE = 'unitstype',
    UNLOCKED_TIME_PERIOD = 'unlockedtimeperiod',
    USAGE = 'usage',
    USEREVENT_SCRIPT = 'usereventscript',
    VENDOR = 'vendor',
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
    WORKFLOW_ACTION_SCRIPT = 'workflowactionscript',
    WORK_ORDER = 'workorder',
    WORK_ORDER_CLOSE = 'workorderclose',
    WORK_ORDER_COMPLETION = 'workordercompletion',
    WORK_ORDER_ISSUE = 'workorderissue',
    WORKPLACE = 'workplace',
    ZONE = 'zone'
}
