import * as N_record from '../record';

interface FindSublistLineWithValueOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom sublist field. */
    fieldId: string;
    /** The value to search for. */
    value: N_record.FieldValue;
}

interface GetFieldOptions {
    /** The internal ID of a standard or custom body field. */
    fieldId: string;
}

interface SublistOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
}

interface SublistLineOptions {
    /** The internal ID of the sublist. */
    sublistId: string;
    /** The internal ID of a standard or custom body field. */
    fieldId: string;
    line: number;
}

export interface ReadOnlySubrecord {
    /** Returns the body field names (internal IDs) of all the fields in the subrecord, including the machine header field and matrix header fields. */
    readonly fields: string[];
    /** Returns all the names (internal IDs) of all the sublists in the subrecord. */
    readonly sublists: string[];
    /** Returns the line number for the first occurrence of a field value in a sublist. Note that line indexing begins at 0 with SuiteScript 2.0. */
    findSublistLineWithValue(options: FindSublistLineWithValueOptions): number;
    /** Returns the number of lines in a sublist. */
    getLineCount(options: SublistOptions): number;
    /** Returns all the field names (internal IDs) in a sublist. */
    getSublistFields(options: SublistOptions): string[];
    /** Returns the value of a sublist field in a text representation. */
    getSublistText(options: SublistLineOptions): string;
    /** Returns the text representation of a field value. */
    getText(options: GetFieldOptions): string;
    /** Returns the value of a field. */
    getValue(options: GetFieldOptions): N_record.FieldValue;
}

export interface ReadOnlyTransactionRecord {
    /** Use this property to get the internal ID of a record when editing an existing transaction. */
    readonly id: number | null;
    /** Returns the record type internal ID. */
    readonly recordType: N_record.Type | string;
    /** Returns the body field names (internal IDs) of all the fields in the transaction record, including the machine header field and matrix header fields. */
    readonly fields: string[];
    /** Returns all the names (internal IDs) of all the sublists in the transaction record. */
    readonly sublists: string[];
    /** Returns the line number for the first occurrence of a field value in a sublist. Note that line indexing begins at 0 with SuiteScript 2.0. */
    findSublistLineWithValue(options: FindSublistLineWithValueOptions): number;
    /** Returns the number of lines in a sublist. */
    getLineCount(options: SublistOptions): number;
    /** Returns all the field names (internal IDs) in a sublist */
    getSublistFields(options: SublistOptions): string[];
    /** Returns the subrecord associated with a sublist field. */
    getSublistSubrecord(options: SublistLineOptions): ReadOnlySubrecord;
    /** Returns the value of a sublist field in a text representation. */
    getSublistText(options: SublistLineOptions): string;
    /** Returns the value of a sublist field. */
    getSublistValue(options: SublistLineOptions): N_record.Type | string;
    /** Returns the subrecord for the associated field. */
    getSubrecord(options: GetFieldOptions): ReadOnlySubrecord;
    /** Returns the text representation of a field value. */
    getText(options: GetFieldOptions): string;
    /** Returns the value of a field. */
    getValue(options: GetFieldOptions): N_record.FieldValue;
    /** Returns the value indicating whether the associated sublist field contains a subrecord */
    hasSublistSubrecord(options: SublistLineOptions): boolean;
    /** Returns the value indicating whether the field contains a subrecord. */
    hasSubrecord(options: GetFieldOptions): boolean;
}

interface GetSegmentOptions {
    /** String value of the custom segment ID. */
    segmentId: string;
}

interface SetsegmentOptions extends GetSegmentOptions {
    /** Internal ID of the custom segment value that the custom line should be set to. Omitting this parameter unsets the custom segment value. */
    segmentValueId: number;
}

/* Taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1017098 */
interface CustomLine {
    /** Sets the account ID property for a CustomLine object in a primary or secondary book.  */
    accountId: number;
    /** Returns the amount for a CustomLine. If it is a credit, than the amount will include a negative sign. */
    readonly amount: string;
    /** Sets the class ID value for a CustomLine object in a primary or secondary book. This value is the internal NetSuite ID for a class. */
    classId: number;
    /** Sets the credit amount of a CustomLine object in a primary or secondary book. The value is rounded to currency precision. */
    creditAmount: string;
    /** Sets the debit amount of a CustomLine object in a primary or secondary book. The value is rounded to currency precision. */
    debitAmount: string;
    /** Sets the department ID for a CustomLine object in a primary or secondary book. This value is the internal NetSuite ID for a department. */
    departmentId: number;
    /** Sets the entity ID property for a CustomLine object in a primary or secondary book. */
    entityId: number;
    /** Sets a custom GL impact line to affect only the primary book in a Custom GL plug-in implementation */
    isBookSpecific: boolean;
    /** Sets the location ID for a CustomLine object in a primary or secondary book. This value is the internal NetSuite ID for a location. */
    locationId: number;
    /** Sets the Memo field on a CustomLine object. */
    memo: string;
    /** Returns a string array of available custom segment IDs for which a value can be set. */
    readonly segments: string[];
    /** Returns the internal NetSuite ID for the custom segment value set on the line on a CustomLine object */
    getSegmentValueId(options: GetSegmentOptions):  number;
    /** Sets custom segment values on a CustomLine object */
    setSegmentValueId(options: SetsegmentOptions): void;
}

interface GetLineOptions {
    /** The line number starting at index 0 */
    index: number
}

/* Taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1017095 */
interface CustomLines {
    /** Returns the number of custom lines with GL impact for a specific accounting book in a transaction */
    readonly count: number;
    /** Adds a CustomLine object to the parent CustomLines object in a Custom GL Lines plug-in implementation and returns the new object. Use this method to add a custom line with GL impact to a transaction. */
    addNewLine(): CustomLine;
    /** Returns a CustomLine object that represents a custom line with GL impact. CustomLine objects are stored in the CustomLines object starting at index 0. */
    getLine(options: GetLineOptions): CustomLine
}

/* Taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1017097 */
interface StandardLine {
    /** Returns the internal NetSuite ID of the entity for a StandardLine object */
    readonly accountId: number;
    /** Returns the amount for a StandardLine. */
    amount: string;
    /** Returns the internal NetSuite ID for the class on a StandardLine object. */
    readonly classId: number;
    /** Returns the credit amount for a StandardLine object. */
    readonly creditAmount: string;
    /** Returns the debit amount for a StandardLine object. */
    readonly debitAmount: string;
    /** Returns the internal NetSuite ID for the department on a StandardLine object. */
    readonly departmentId: string;
    /** Returns the internal NetSuite ID for the entity on a StandardLine object. */
    readonly entityId: string;
    /** Returns the internal NetSuite database ID for a standard GL impact line. */
    readonly id: number;
    /** Returns true if the transaction is a posting transaction and the associated standard GL impact line posts to the general ledger. Returns false if the transaction is a non-posting transaction. */
    readonly isPosting: boolean;
    /** Returns true if a standard GL impact line is a credit to a tax account. */
    readonly isTaxable: boolean;
    /** Returns the internal NetSuite ID for the location on a StandardLine object. */
    readonly locationId: number;
    /** Returns the Memo field on a StandardLine object. */
    readonly memo: string;
    /** Returns the internal NetSuite ID of the subsidiary for the entity associated with a standard GL impact line. */
    readonly subsidiaryId: number;
    /** Returns a string that represents the amount of tax charged on a standard GL line. */
    readonly taxAmount: string;
    /** Returns a string that represents the amount of a standard GL line that was subject to tax. */
    readonly taxableAmount: string;
    /** Returns the internal NetSuite ID of the tax code for a standard GL line. */
    readonly taxItemId: number;
    /** Returns the tax type for a standard GL line that was subject to tax. */
    readonly taxType: string;

    /** Returns the internal NetSuite ID for the custom segment value set on the line on a StandardLine object. */
    getSegmentValueId(options: GetSegmentOptions):  number;
}

/* Taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1017094 */
interface StandardLines {
    /** Returns the number of standard lines with GL impact for a specific accounting book in a transaction. Use this method in conjunction with to read individual standard lines. */
    readonly count: number;
    /** Returns a StandardLine object that represents a standard line with GL impact. StandardLine objects are stored in the StandardLines object starting at index 0. */
    getLine(options: GetLineOptions): StandardLine
}

/* Taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1017096 */
interface AccountingBook {
    /** Returns the internal NetSuite ID for the accounting book to be passed to a Custom GL Lines plug-in implementation. */
    readonly id: number;
    /** Returns true if the book object is the primary accounting book for the NetSuite account or returns false if the accounting book is a secondary accounting book. */
    readonly isPrimary: boolean;
}

/* Taken from https://suiteanswers.custhelp.com/app/answers/detail/a_id/1016989 */
interface glPluginContext {
    /** Contains an array of all standard lines with GL impact in a transaction as StandardLine objects. */
    standardLines: StandardLines;
    /** Contains an array of all custom lines with GL impact in a transaction as CustomLine objects. */
    customLines: CustomLines;
    /** Use this to access properties of the transaction with SuiteScript API nlobjRecord functions. You cannot modify the transaction. */
    transactionRecord: ReadOnlyTransactionRecord;
    /** Represents the accounting book passed to a Custom GL plug-in implementation when you save a transaction. Use the methods available to the book object to determine if the book is a primary or secondary book or get the internal NetSuite ID of the accounting book. */
    book: AccountingBook;
}

export type customizeGlImpact = (context: glPluginContext) => void;
