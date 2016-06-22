interface NLObjAssistant {
  
}

interface NLObjAssistantStep {
  
}

interface NLObjButton {
  
}

interface NLObjColumn {
  
}

interface NLObjConfiguration {
  
}

interface NLObjContext {
  
}

interface NLObjCSVImport {
    /**
     * Sets the data to be imported in a linked file for a multi-file import job, by referencing a file in the file cabinet using nlapiLoadFile(id), or by inputting CSV data as raw string.
     *
     * @param {string} sublist The internal ID of the record sublist for which data is being imported.
     * @param {string|NLObjFile} file Raw data or nlobjFile object containing CSV data.
     */
    setLinkedFile(sublist: string, file: string|NLObjFile): NLObjCSVImport;
    /**
     * Sets the name of the saved import map to be used for an import, by referencing the internal ID or script ID of the import map.
     *
     * @param {string} savedImport The internal ID or script ID of the saved mapping to use for the import job.
     */
    setMapping(savedImport: string): void;
    /**
     * Sets the name of the saved import map to be used for an import, by referencing the internal ID or script ID of the import map.
     *
     * @param {string} option The name of the option; in this case, jobName.
     * @param {string} value The value for the jobName option, meaning the text to be displayed in the Job Name column at Setup > Import/Export > View CSV Import Status.
     */
    setOption(option: string, value: string): void;
    /**
     * Sets the data to be imported in the primary file for an import job, by referencing a file in the file cabinet using nlapiLoadFile, or by inputting CSV data as raw string.
     *
     * @param {string|NLObjFile} file Raw data or nlobjFile object containing CSV data.
     */
    setPrimaryFile(file: string|NLObjFile): void;
    /**
     * Sets the data to be imported in the primary file for an import job, by referencing a file in the file cabinet using nlapiLoadFile, or by inputting CSV data as raw string.
     *
     * @param {string} queue The new queue number. Valid values range from '1' to '5', depending upon the SuiteCloud License.
     */
    setQueue(queue: string): void;
}

interface NLObjEmailMerger {
    
}

interface NLObjError {
  
}

interface NLObjField {
  
}

interface NLObjFieldGroup {
  
}

interface NLObjFile {
  
}

interface NLObjForm {
  
}

interface NLObjJobManager {

}

interface NLObjList {
  
}

interface NLObjLogin {

}

interface NLObjPortlet {
  
}

interface NLObjRecord {
    /**
     * Commit the current line in a sublist.
     *
     * @param {string} 	group sublist name
     */
    commitLineItem(group: string): void;
    /**
     * Returns a nlobjSubrecord object. Use this API to create a subrecord from a sublist field on the parent record.
     *
     * @param {string} sublist The sublist internal ID on the parent record.
     * @param {string} fldname The internal ID of the 'subrecord field' on the sublist of the parent record.
     */
    createCurrentLineItemSubrecord(sublist: string, fldname: string): NLObjSubrecord;
    /**
     * Return line number for 1st occurence of field value in a sublist column.
     *
     * @param {string} 	group	sublist name
     * @param {string} 	fldnam	sublist field name
     * @param {number} 	column  matrix column index (1-based)
     * @param {string} 	value 	matrix field value
     */
    findLineItemMatrixValue(group: string, fldnam: string, column: number, value: string): number;
    /**
     * Return line number for 1st occurence of field value in a sublist column.
     *
     * @param {string} group	sublist name
     * @param {string} fldnam	sublist field name
     * @param {string} value	sublist field value
     */
    findLineItemValue(group: string, fldnam: string, value: string): number;
    /**
     * Return an Array of all field names on the record.
     */
    getAllFields(): string[];
    /**
     * Return an Array of all field names on a record for a particular sublist.
     *
     * @param {string} group sublist name
     */
    getAllLineItemFields(group: string): string[];
    /**
     * Return the current value of a sublist field.
     *
     * @param {string} 	group sublist name
     * @param {string} 	name sublist field name
     * @param {string}  timezone
     */
    getCurrentLineItemDateTimeValue(group: string, name: string, timezone?: string): string;
    /**
     * Return the current value of a sublist matrix field.
     *
     * @param {string} 	group matrix sublist name
     * @param {string} 	name matrix field name
     * @param {number} 	column matrix field column index (1-based)
     */
    getCurrentLineItemMatrixValue(group: string, name: string, column: number): string;
    /**
     * Return the current value of a sublist field.
     *
     * @param {string} 	group sublist name
     * @param {string} 	name sublist field name
     */
    getCurrentLineItemValue(group: string, name: string): string;
    /**
     * Return the value of a field on the current record on a page.
     * @restriction supported in client and user event scripts only.
     * @param {string} fldnam the field name
     * @param {string} timezone [optional] Olson value
     */
    getDateTimeValue(fldnam: string, timezone?: string): string;
    /**
     * Return field metadata for field.
     * @param {string} fldnam Field name
     */
    getField(fldnam: string): NLObjField;
    /**
     * Return the display value for a select field.
     * @restriction only supported for select fields
     *
     * @param {string} name Field name
     */
    getFieldText(name: string): string;
    /**
     * Return the selected display values of a multi-select field as an Array.
     * @restriction only supported for multi-select fields
     *
     * @param {string} name Field name
     */
    getFieldTexts(name: string): string[];
    /**
     * Return the value of a field.
     *
     * @param {string} name Field name.
     */
    getFieldValue(name: string): string;
    /**
     * Return the selected values of a multi-select field as an Array.
     *
     * @param {string} name Field name.
     */
    getFieldValues(name: string): string[];
    /**
     * Return the internalId of the record or NULL for new records.
     */
    getId(): number;
    /**
     * Return the number of lines in a sublist.
     *
     * @param {string} group sublist name
     */
    getLineItemCount(group: string): number;
    /**
     * Return the value of a sublist field.
     *
     * @param {string} group sublist name
     * @param {string} name sublist field name
     * @param {number} line line number (1-based)
     * @param {string} timezone value
     */
    getLineItemDateTimeValue(group: string, name: string, line: number, timezone?: string): string;
    /**
     * Return metadata for sublist field.
     *
     * @param {string} type Sublist name
     * @param {string} fldnam Sublist field name
     * @param {int} linenum Line number (1-based). If empty, the current sublist field is returned. Only settable for sublists of type list.
     */
    getLineItemField(type: string, fldnam: string, linenum?: number): NLObjField;
    /**
     * Return metadata for sublist field.
     *
     * @param {string} type Matrix sublist name
     * @param {string} fldnam Matrix field name
     * @param {number} linenum Line number
     * @param {number} column Matrix column (1-based)
     */
    getLineItemMatrixField(type: string, fldnam: string, linenum: number, column: number): NLObjField;
    /**
     * Return the text value of a sublist field.
     *
     * @param {string} group sublist name
     * @param {string} name sublist field name
     * @param {number} line line number (1-based)
     */
    getLineItemText(group: string, name: string, line: number): string;
    /**
     * Return the value of a sublist field.
     *
     * @param {string} group sublist name
     * @param {string} name sublist field name
     * @param {number} line line number (1-based)
     */
    getLineItemValue(group: string, name: string, line: number): string;
    /**
     * Return the number of columns for a matrix field.
     *
     * @param {string} 	group matrix sublist name
     * @param {string} 	name matrix field name
     */
    getMatrixCount(group: string, name: string): number;
    /**
     * Return field metadata for field.
     *
     * @param {string} type matrix sublist name
     * @param {string} fldnam matrix field name
     * @param {number} linenum matrix column (1-based)
     */
    getMatrixField(type: string, fldnam: string, linenum: number): NLObjField;
    /**
     * Get the value of a matrix header field.
     *
     * @param {string} type matrix sublist name
     * @param {string} name	matrix field name
     * @param {number} column matrix column index (1-based)
     */
    getMatrixValue(type: string, name: string, column: number): string;
    /**
     * Return the recordType corresponding to this record.
     */
    getRecordType(): string;
    /**
     * Insert a new line into a sublist.
     *
     * @param {string} group Sublist name.
     * @param {number} line Line index at which to insert line.
     */
    insertLineItem(group: string, line?: number): void;
    /**
     * Remove an existing line from a sublist.
     *
     * @param {string} group Sublist name.
     * @param {number} line Line number to remove.
     */
    removeLineItem(group: string, line?: number): void;
    /**
     * Select an existing line in a sublist.
     *
     * @param {string} group Sublist name.
     * @param {number} line Line number to select.
     */
    selectLineItem(group: string, line: number): void;
    /**
     * Insert and select a new line in a sublist.
     *
     * @param {string} group sublist name
     */
    selectNewLineItem(group: string): void;
    /**
     * Set the current value of a sublist field.
     * @param {string} 	group sublist name
     * @param {string} 	name sublist field name
     * @param {string} 	value sublist field value
     * @param {string} 	timezone 
     */
    setCurrentLineItemDateTimeValue(group: string, name: string, value: string, timezone?: string): void;
    /**
     * Set the current value of a sublist matrix field.
     *
     * @param {string} 	group matrix sublist name
     * @param {string} 	name matrix field name
     * @param {number} 	column matrix field column index (1-based)
     * @param {string} 	value matrix field value
     */
    setCurrentLineItemMatrixValue(group: string, name: string, column: number, value: string): void;
    /**
     * Set the current value of a sublist field.
     * @param {string} 	group sublist name
     * @param {string} 	name sublist field name
     * @param {string} 	value sublist field value
     */
    setCurrentLineItemValue(group: string, name: string, value: string): void;
    /**
     * Set the value of a field.
     *
     * @param {string} name Field name.
     * @param {string} value Field value.
     * @param {string} timezone Olson value.
     */
    setDateTimeValue(name: string, value: string, timezone?: string): void;
    /**
     * Set the value (via display value) of a select field.
     * @restriction only supported for select fields
     *
     * @param {string} name Field name
     * @param {string} text Field display value
     */
    setFieldText(name: string, text: string): void;
    /**
     * Set the values (via display values) of a multi-select field.
     * @restriction only supported for multi-select fields
     *
     * @param {string} name Field name
     * @param {string[]} texts Array of field display values
     */
    setFieldTexts(name: string, texts: string[]): void;
    /**
     * Set the value of a field.
     *
     * @param {string} name Field name
     * @param {string} value Field value
     */
    setFieldValue(name: string, value: string): void;
    /**
     * Set the values of a multi-select field.
     *
     * @param {string} name Field name
     * @param {string[]} values String array containing field values
     */
    setFieldValues(name: string, values: string[]): void;
    /**
     * Set the value of a sublist field.
     *
     * @param {string} group Sublist name
     * @param {string} name Sublist field name
     * @param {number} line Line number (1-based)
     * @param {string} value Datetime value
     * @param {string} timezone Optional value
     */
    setLineItemDateTimeValue(group: string, name: string, line: number, value: string, timezone?: string): void;
    /**
     * Set the value of a sublist field.
     *
     * @param {string} group sublist name
     * @param {string} name sublist field name
     * @param {number} line line number (1-based)
     * @param {string} value sublist field value
     */
    setLineItemValue(group: string, name: string, line: number, value: string): void;
    /**
     * Set the value of a matrix header field.
     *
     * @param {string} type matrix sublist name
     * @param {string} name	matrix field name
     * @param {number} column matrix column index (1-based)
     * @param {string} value field value
     */
    setMatrixValue(type: string, name: string, column: number, value: string): void;
}

interface NLObjReportDefinition {
    
}

interface NLObjReportForm {
    
}

interface NLObjRequest {
  
}

interface NLObjResponse {
  
}

interface NLObjSearch {
    /**
     * Adds a single return column to the search. Note that existing columns on the search are not changed.
     *
     * @param {NLObjSearchColumn} column The nlobjSearchColumn you want added to the search.
     */
    addColumn(column: NLObjSearchColumn): void;
    /**
     * Adds multiple return columns to the search. Note that existing columns on the search are not changed.
     *
     * @param {NLObjSearchColumn[]} columns The nlobjSearchColumn[] you want added to the search.
     */
    addColumns(columns: NLObjSearchColumn[]): void;
    /**
     * Adds a single search filter. Note that existing filters on the search are not changed.
     *
     * @param {nlobjSearchFilter} filter The nlobjSearchFilter you want added to the search.
     */
    addFilter(filter: NLObjSearchFilter): void;
    /**
     * Adds a search filter list. Note that existing filters on the search are not changed.
     *
     * @param {nlobjSearchFilter[]} filters The nlobjSearchFilter[] you want added to the search.
     */
    addFilters(filters: NLObjSearchFilter[]): void;
    /**
     * Deletes a given saved search that was created through scripting or through the UI.
     */
    deleteSearch(): void;
    /**
     * Gets the search return columns for the search.
     */
    getColumns(): NLObjSearchColumn[];
    /**
     * Gets the filter expression for the search.
     */
    getFilterExpression(): any[];
    /**
     * Gets the filters for the search.
     */
    getFilters(): NLObjSearchFilter[];
    /**
     * Gets the internal ID of the search.
     */
    getId(): string;
    /**
     * Gets whether the nlobjSearch has been set as public search.
     */
    getIsPublic(): boolean;
    /**
     * Gets the script ID of the search.
     */
    getScriptId(): string;
    /**
     * Returns the record type that the search was based on. This method is helpful when you have the internal ID of the search, but do not know the record type the search was based on.
     */
    getSearchType(): string;
    /**
     * Runs an ad-hoc search, returning the results. Be aware that calling this method does NOT save the search.
     */
    runSearch(): NLObjSearchResultSet;
    /**
     * Saves the search created by nlapiCreateSearch(type, filters, columns).
     * @param {string} title The title you want to give the saved search.
     * @param {string} scriptId The script ID you want to assign to the saved search. All saved search script IDs must be prefixed with customsearch.
     */
    saveSearch(title?: string, scriptId?: string): number;
    /**
     * Sets the return columns for this search, overwriting any prior columns. If null is passed in it is treated as if it were an empty array and removes any existing columns on the search.
     * 
     * @param {NLObjSearchColumn[]} columns The nlobjSearchColumn[] you want to set in the search. Passing in null or [] removes all columns from the search.
     */
    setColumns(columns: NLObjSearchColumn[]): void;
    /**
     * Sets the search filter expression, overwriting any prior filters. If null is passed in, it is treated as if it was an empty array and removes any existing filters on this search.
     *
     * @param {Object[]} filterExpression The filter expression you want to set in the search. Passing in null or [] removes all filters from the search.
     */
    setFilters(filterExpression: any[]): void;
    /**
     * Sets whether the search is public or private. By default, all searches created through nlapiCreateSearch(type, filters, columns) are private.
     *
     * @param {boolean} value Set to true to designate the search as a public search. Set to false to designate the search as a private search.
     */
    setIsPublic(value: boolean): void;
    /**
     * Acts like nlapiSetRedirectURL(type, identifier, id, editmode, parameters) but redirects end users to a populated search definition page. You can use this method with any kind of search that is held in the nlobjSearch object.
     *
     * @restriction This method is supported in afterSubmit user event scripts, Suitelets, and client scripts.
     */
    setRedirectURLToSearch(): void;
    /**
     * Acts like nlapiSetRedirectURL(type, identifier, id, editmode, parameters) but redirects end users to a search results page. You can use this method with any kind of search that is held in the nlobjSearch object.
     *
     * @restriction This method is supported in afterSubmit user event scripts, Suitelets, and client scripts.
     */
    setRedirectURLToSearchResults(): void;
}

interface NLObjSearchColumn {
  
}

interface NLObjSearchFilter {
  
}

interface NLObjSearchResult {
  
}

interface NLObjSearchResultSet {
    /**
     * Calls the developer-defined callback function for every result in this set.
     *
     * @param {function} callback A JavaScript function. This may be defined as a separate named function, or it may be an anonymous inline function.
     */
    forEachResult(callback: (result: NLObjSearchResult) => boolean): void;
    /**
     * Returns a list of nlobjSearchColumn objects for this result set. This list contains one nlobjSearchColumn object for each result column in the nlobjSearchResult objects returned by this search.
     */
    getColumns(): NLObjSearchColumn[];
    /**
     * Retrieve a slice of the search result. The start parameter is the inclusive index of the first result to return. The end parameter is the exclusive index of the last result to return.
     *
     * @param {number} start The index number of the first result to return, inclusive.
     * @param {number} end The index number of the last result to return, exclusive.
     */
    getResults(start: number, end: number): NLObjSearchResult[];
}

interface NLObjSelectOption {
  
}

interface NLObjServerResponse {
  
}

interface NLObjSubList {
  
}

interface NLObjSubrecord {
    /**
     * Commit the subrecord after you finish modifying it.
     */
    commit(): void;
    /**
     * Cancel any modification on a subrecord.
     */
    cancel(): void;
}

interface NLObjTab {
  
}

interface NLObjTemplateRenderer {
  
}

interface Window {
    /**
     * Gets the value of a URL parameter (undocumented NetSuite method).
     * @param {string} parameter The URL parameter to get the value of.
     */
    getParameter(parameter: string): string;
}

/**
 * Add days to a Date object and returns a new Date
 *
 * @param {date} d Date object used to calculate the new date
 * @param {number} days The number of days to add to this date object.
 */
declare function nlapiAddDays(d: Date, days: number): Date;
/**
 * Add months to a Date object and returns a new Date.
 *
 * @param {date} d Date object used to calculate the new date
 * @param {number} months The number of months to add to this date object.
 */
declare function nlapiAddMonths(d: Date, months: number): Date;
/**
 * Attach a single record to another with optional properties.
 * @param {string} type1 The record type name being attached.
 * @param {number} id1 The internal ID for the record being attached.
 * @param {string} type2 The record type name being attached to.
 * @param {number} id2 The internal ID for the record being attached to.
 * @param {Object} properties Object containing name/value pairs used to configure attach operation.
 */
declare function nlapiAttachRecord(type1: string, id1: number, type2: string, id2: number, properties?: Object): void;
/**
 * Cancel any changes made on the currently selected line.
 * @restriction Only supported for sublists of type inlineeditor and editor
 *
 * @param {string} type Sublist name.
 */
declare function nlapiCancelLineItem(type: string): void;
/**
 * Save changes made on the currently selected line to the sublist.
 *
 * @param {string} type Sublist name.
 */
declare function nlapiCommitLineItem(type: string): void;
/**
 * Return a new record using values from an existing record.
 * @param {string} type The record type name.
 * @param {number|string} id The internal ID of the record to copy.
 * @param {Object} initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 */
declare function nlapiCopyRecord(type: string, id: number|string, initializeValues?: Object): NLObjRecord;
/**
 * Return a new assistant page.
 * @restriction Suitelets only
 *
 * @param {string} title Page title
 * @param {boolean} hideHeader true to hide the page header (false by default)
 */
declare function nlapiCreateAssistant(title: string, hideHeader?: boolean): NLObjAssistant;
/**
 * Initializes a new record and returns an nlobjCSVImport object.
 * @restriction Only supported for bundle installation scripts, scheduled scripts, and RESTlets.
 */
declare function nlapiCreateCSVImport(): NLObjCSVImport;
/**
 * Create a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 */
declare function nlapiCreateCurrentLineItemSubrecord(type: string, fldnam: string): NLObjSubrecord;
/**
 * Create an email merger used to assemble subject and body text of an email from a given
 * FreeMarker template and a set of associated records.
 * @restriction Server SuiteScript only
 *
 * @param {number} templateId Internal ID of the template
 */
declare function nlapiCreateEmailMerger(templateId): NLObjEmailMerger;
/**
 * Create an nlobjError object that can be used to abort script execution and configure error notification
 *
 * @param {string} code Error code
 * @param {string} details Error description
 * @param {boolean} suppressEmail If true then suppress the error notification emails from being sent out (false by default).
 */
declare function nlapiCreateError(code: string, details: string, suppressEmail?: boolean): NLObjError;
/**
 * Instantiate a file object (specifying the name, type, and contents which are base-64 encoded for binary types.)
 * @restriction Server SuiteScript only
 *
 * @param {string} name File name
 * @param {string} type File type i.e. plainText, htmlDoc, pdf, word (see documentation for the list of supported file types)
 * @param {string} contents String containing file contents (must be base-64 encoded for binary types)
 */
declare function nlapiCreateFile(name: string, type: string, contents: string): NLObjFile;
/**
 * Return a new entry form page.
 * @restriction Suitelets only
 *
 * @param {string} title Page title
 * @param {boolean} hideHeader true to hide the page header (false by default)
 */
declare function nlapiCreateForm(title: string, hideHeader?: boolean): NLObjForm;
/**
 * Return a new list page.
 * @restriction Suitelets only
 *
 * @param {string} title Page title
 * @param {boolean} hideHeader true to hide the page header (false by default)
 */
declare function nlapiCreateList(title: string, hideHeader?: boolean): NLObjList;
/**
 * Instantiate a new nlobjRecord object containing all the default field data for that record type.
 * @param {string} type The record type name.
 * @param {Object} initializeValues Contains an array of name/value pairs of defaults to be used during record initialization.
 */
declare function nlapiCreateRecord(type: string, initializeValues?: Object): NLObjRecord;
/**
 * Creates an instance of a report definition object.
 */
declare function nlapiCreateReportDefinition(): NLObjReportDefinition;
/**
 * Creates an nlobjReportForm object to render the report definition.
 *
 * @param {string} title The title of the form
 */
declare function nlapiCreateReportForm(title: string): NLObjReportForm;
/**
 * Creates a new search.
 *
 * @param {string} type the record type you are searching
 * @param {NLObjSearchFilter|NLObjSearchFilter[]|Object[]} filters A single nlobjSearchFilter object or an array of nlobjSearchFilter objects or a search filter expression
 * @param {NLObjSearchColumn|NLObjSearchColumn[]} columns A single nlobjSearchColumn object or an array of nlobjSearchColumn objects.
 */
declare function nlapiCreateSearch(type: string, filters?: NLObjSearchFilter|NLObjSearchFilter[]|Object[], columns?: NLObjSearchColumn|NLObjSearchColumn[]): NLObjSearch;
/**
 * Create a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 */
declare function nlapiCreateSubrecord(fldnam: string): NLObjSubrecord;
/**
 * Create a template renderer used to generate various outputs based on a template.
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} type	Media type: pdf|html
 * @param {string} engineType Default is freemarker/html
 */
declare function nlapiCreateTemplateRenderer(type: string, engineType?: string): NLObjTemplateRenderer;
/**
 * Convert a Date object into a String
 *
 * @param {date} d Date object being converted to a string.
 * @param {string} formattype Format type to use: date|datetime|timeofday with date being the default.
 */
declare function nlapiDateToString(d: Date, formattype?: string): string;
/**
 * Delete a file from the file cabinet.
 * @governance 20 units
 * @restriction Server SuiteScript only
 *
 * @param {number} id Internal ID of file to be deleted
 */
declare function nlapiDeleteFile(id: number): number;
/**
 * Delete a record from the system.
 * @param {string} type The record type name.
 * @param {number|string} id The internal ID of the record to delete.
 */
declare function nlapiDeleteRecord(type: string, id: number|string): void;
/**
 * Dettach a single record from another with optional properties.
 * @param {string} type1 The record type name being attached.
 * @param {number} id1 The internal ID for the record being attached.
 * @param {string} type2 The record type name being attached to.
 * @param {number} id2 The internal ID for the record being attached to.
 * @param {Object} properties Object containing name/value pairs used to configure detach operation.
 */
declare function nlapiDetachRecord(type1: string, id1: number, type2: string, id2: number, properties?: Object): void;
/**
 * Sets the given field to disabled or enabled.
 *
 * @restriction supported in client scripts only
 * @param {string} fldnam the internal ID name of the field to enable/disable
 * @param {boolean} val if set to true, the field is disabled; if set to false, it is enabled.
 */
declare function nlapiDisableField(fldnam: string, val: boolean): void;
/**
 * Sets the given line item field of a sublist to disabled or enabled.
 *
 * @restriction supported in client scripts only
 * @param {string} type The sublist internal ID
 * @param {string} fldnam The name of the line item field to enable/disable
 * @param {boolean} val If set to true, the field is disabled; if set to false, it is enabled
 */
declare function nlapiDisableLineItemField(type: string, fldnam: string, val: boolean): void;
/**
 * Edit a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 */
declare function nlapiEditCurrentLineItemSubrecord(type: string, fldnam: string): NLObjSubrecord;
/**
 * Edit a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 */
declare function nlapiEditSubrecord(fldnam: string): NLObjSubrecord;
/**
 * Encrypt a String using a SHA-1 hash function.
 *
 * @param {string} s String to encrypt.
 */
declare function nlapiEncrypt(s: string): string;
/**
 * Escape a String for use in an XML document.
 *
 * @param {string} text String to escape
 */
declare function nlapiEscapeXML(text: string): string;
/**
 * Calculate exchange rate between two currencies as of today or an optional effective date.
 * @governance 10 units
 *
 * @param {string|number} fromCurrency Internal ID or currency code of currency we are converting from.
 * @param {string|number} toCurrency Internal ID or currency code of currency we are converting to.
 * @param {string} date String containing date of effective exchange rate. defaults to today.
 */
declare function nlapiExchangeRate(fromCurrency: string|number, toCurrency: string|number, date?: string): number;
/**
 * Return the first line number that a matrix field value appears in.
 *
 * @param {string} 	type Sublist name
 * @param {string} 	fldnam Matrix field name
 * @param {number} 	column Matrix column index (1-based)
 * @param {string} 	val The value being queried for in a matrix field
 */
declare function nlapiFindLineItemMatrixValue(type: string, fldnam: string, column: number, val: string): number;
/**
 * Return the first line number that a sublist field value appears in.
 *
 * @param {string} type Sublist name
 * @param {string} fldnam Sublist field name
 * @param {string} val The value being queried for in a sublist field
 */
declare function nlapiFindLineItemValue(type: string, fldnam: string, val: string): number;
/**
 * Format a number for data entry into a currency field.
 *
 * @param {string} str Numeric string used to format for display as currency using user's locale.
 */
declare function nlapiFormatCurrency(str: string): string;
/**
 * Return context information about the current user/script.
 */
declare function nlapiGetContext(): NLObjContext;
/**
 * Return the value of a field on the currently selected line.
 *
 * @param {string} type Sublist name
 * @param {string} fldnam Sublist field name
 * @param {string} timezone Timezone
 */
declare function nlapiGetCurrentLineItemDateTimeValue(type: string, fldnam: string, timezone?: string): string;
/**
 * Return the line number for the currently selected line.
 *
 * @param {string} type Sublist name
 */
declare function nlapiGetCurrentLineItemIndex(type): number;
/**
 * Return the label of a select field's current selection on the currently selected line.
 *
 * @param {string} type Sublist name
 * @param {string} fldnam Sublist field name
 */
declare function nlapiGetCurrentLineItemText(type: string, fldnam: string): string;
/**
 * Return the value of a field on the currently selected line.
 *
 * @param {string} type Sublist name
 * @param {string} fldnam Sublist field name
 */
declare function nlapiGetCurrentLineItemValue(type: string, fldnam: string): string;
/**
 * Returns the values of a multiselect sublist field on the currently selected line.
 *
 * @param {string} type The sublist internal ID.
 * @param {string} fldnam The name of the multiselect field.
 */
declare function nlapiGetCurrentLineItemValues(type: string, fldnam: string): string[];
/**
 * Return the internal ID for the current user's department.
 */
declare function nlapiGetDepartment(): number;
/**
 * This API returns the value of a datetime field. If timeZone is passed in, the datetime value is converted to that time zone and then returned.
 * If timeZone is not passed in, the datetime value is returned in the default time zone.
 *
 * @param {string} fieldId the internal field ID of a datetime field
 * @param {string|number} timeZone One of values (string) or keys (int) from the Olson Values table
 */
declare function nlapiGetDateTimeValue(fieldId: string, timeZone?: string|number): string;
/**
 * Return field definition for a field.
 * @param {string} fldnam The name of the field.
 */
declare function nlapiGetField(fldnam: string): NLObjField;
/**
 * Return the display value of a select field's current selection on the current record on a page.
 * @param {string} fldnam The field name.
 */
declare function nlapiGetFieldText(fldnam: string): string;
/**
 * Return the values (via display text) of a multiselect field on the current record.
 */
declare function nlapiGetFieldTexts(fldnam: string): string[];
/**
 * Return the value of a field on the current record on a page.
 * @param {string} fldnam The field name.
 */
declare function nlapiGetFieldValue(fldnam: string): string;
/**
 * Return the values of a multiselect field on the current record on a page.
 * @param {string} fldnam The field name.
 */
declare function nlapiGetFieldValues(fldnam: string): string[];
/**
 * Returns a job manager instance.
 *
 * @param {string} jobType Aet to DUPLICATERECORDS
 */
declare function nlapiGetJobManager(jobType: string): NLObjJobManager;
/**
 * Return the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type Sublist name
 * @param {string} 	fldnam Sublist field name
 * @param {int} 	linenum Line number (1-based)
 * @param {string} 	timezone
 */
declare function nlapiGetLineItemDateTimeValue(type: string, fldnam: string, linenum: number, timezone?: string): string;
/**
 * Return the number of sublists in a sublist on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * 
 * @param {string} type Sublist name
 */
declare function nlapiGetLineItemCount(type: string): number;
/**
 * Return field definition for a sublist field.
 * @param {string} type Sublist name.
 * @param {string} fldnam Sublist field name.
 * @param {number} linenum Line number for sublist field (1-based) and only valid for sublists of type staticlist and list.
 */
declare function nlapiGetLineItemField(type: string, fldnam: string, linenum?: number): NLObjField;
/**
 * Return an nlobjField containing sublist field metadata.
 * @param {string} type Matrix sublist name.
 * @param {string} fldnam Matrix field name.
 * @param {number} linenum Line number (1-based).
 * @param {number} column Matrix column index (1-based).
 */
declare function nlapiGetLineItemMatrixField(type: string, fldnam: string, linenum: number, column: number): NLObjField;
/**
 * Return the value of a sublist matrix field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type Sublist name
 * @param {string} 	fldnam Sublist field name
 * @param {number} 	linenum Line number (1-based)
 * @param {number} 	column Column index (1-based)
 * @param {string}  value
 */
declare function nlapiGetLineItemMatrixValue(type: string, fldnam: string, linenum: number, column: number, value: string): string;
/**
 * Return the label of a select field's current selection for a particular line.
 *
 * @param {string} 	type Sublist name
 * @param {string} 	fldnam Sublist field name
 * @param {int} 	linenum Line number (1-based)
 */
declare function nlapiGetLineItemText(type: string, fldnam: string, linenum: number): string;
/**
 * Return the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type Sublist name
 * @param {string} 	fldnam Sublist field name
 * @param {number} 	linenum Line number (1-based)
 */
declare function nlapiGetLineItemValue(type: string, fldnam: string, linenum: number): string;
/**
 * Returns the values of a multiselect sublist field on a selected line.
 *
 * @param {string} type The sublist internal ID
 * @param {string} fldnam The name of the multiselect field
 * @param {number} linenum The line number for this field (1-based).
 */
declare function nlapiGetLineItemValues(type: string, fldnam: string, linenum: number): string[];
/**
 * Return the internal ID for the current user's location.
 */
declare function nlapiGetLocation(): number;
/**
 * Returns the NetSuite login credentials of currently logged-in user.
 *
 * @governance 10 units
 * @restriction supported in user event, portlet, Suitelet, RESTlet and SSP scripts
 */
declare function nlapiGetLogin(): NLObjLogin;
/**
 * Return the number of columns for a matrix field.
 *
 * @param {string} type Sublist name
 * @param {string} fldnam Matrix field name
 */
declare function nlapiGetMatrixCount(type: string, fldnam: string): number;
/**
 * Return field definition for a matrix field.
 * @param {string} 	type   Matrix sublist name.
 * @param {string} 	fldnam Matrix field name.
 * @param {number} 	column Matrix field column index (1-based).
 */
declare function nlapiGetMatrixField(type: string, fldnam: string, column: number): NLObjField;
/**
 * Get the value of a matrix header field
 * @param {string} 	type Sublist name.
 * @param {string} 	fldnam Sublist field name.
 * @param {number} 	column Matrix column index (1-based).
 */
declare function nlapiGetMatrixValue(type: string, fldnam: string, column: number): string;
/**
 * Return an record object containing the data being submitted to the system for the currenr record.
 * @restriction User Event scripts only
 */
declare function nlapiGetNewRecord(): NLObjRecord;
/**
 * Return an record object containing the current record's data prior to the write operation.
 * @restriction beforeSubmit|afterSubmit User Event scripts only
 */
declare function nlapiGetOldRecord(): NLObjRecord;
/**
 * Return the internal ID corresponding to the current page or userevent script.
 */
declare function nlapiGetRecordId(): number;
/**
 * Return the recordtype corresponding to the current page or userevent script.
 */
declare function nlapiGetRecordType(): string;
/**
 * Return the internal ID for the current user's role. Returns 31 (Online Form User) when called from online forms or "Available without Login" Suitelets.
 */
declare function nlapiGetRole(): number;
/**
 * Return the internal ID for the current user's subsidiary.
 */
declare function nlapiGetSubsidiary(): number;
/**
 * Return the internal ID for the currently logged in user. Returns -4 when called from online forms or "Available without Login" Suitelets.
 */
declare function nlapiGetUser(): number;
/**
 * Initiates a workflow on-demand and returns the workflow instance ID for the workflow-record combination.
 * @governance 20 units
 *
 * @param {string} recordtype Record type ID of the workflow base record.
 * @param {numberint} id Internal ID of the base record.
 * @param {string|number} workflowid Internal ID or script ID for the workflow definition.
 */
declare function nlapiInitiateWorkflow(recordtype: string, id: number, workflowid: string|number): number;
/**
 * Initiates a workflow on-demand and returns the workflow instance ID for the workflow-record combination.
 * @governance 20 units
 *
 * @param {string} recordtype Record type ID of the workflow base record.
 * @param {numberint} id Internal ID of the base record.
 * @param {string|number} workflowid Internal ID or script ID for the workflow definition.
 * @param {Object} parameters
 */
declare function nlapiInitiateWorkflowAsync(recordtype: string, id: number, workflowid: string|number, parameters: Object): number;
/**
 * Insert and select a new line into the sublist on a page or userevent.
 *
 * @param {string} type Sublist name
 * @param {number} line Line number at which to insert a new line.
 */
declare function nlapiInsertLineItem(type: string, line?: number): void;
/**
 * Adds a select option to a scripted select or multiselect sublist field.
 * @restriction Client SuiteScript only
 *
 * @param {string} type	Sublist name
 * @param {string} fldnam Sublist field name
 * @param {string} value Internal ID for select option
 * @param {string} text Display text for select option
 * @param {boolean} selected If true then option will be selected by default
 */
declare function nlapiInsertLineItemOption(type: string, fldnam: string, value: string, text: string, selected?: boolean): void;
/**
 * Adds a select option to a scripted select or multiselect field.
 * @restriction Client SuiteScript only
 *
 * @param {string} fldnam Field name
 * @param {string} value Internal ID for select option
 * @param {string} text Display text for select option
 * @param {boolean} selected If true then option will be selected by default
 */
declare function nlapiInsertSelectOption(fldnam: string, value: string, text: string, selected?: boolean): void;
/**
 * Returns true if any changes have been made to a sublist.
 * @restriction Client SuiteScript only
 *
 * @param {string} type Sublist name
 */
declare function nlapiIsLineItemChanged(type: string): boolean;
/**
 * Loads a configuration record
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} type
 */
declare function nlapiLoadConfiguration(type: string): NLObjConfiguration;
/**
 * Load a file from the file cabinet (via its internal ID or path).
 * @governance 10 units
 * @restriction Server SuiteScript only
 *
 * @param {string|number} id Internal ID or relative path to file in the file cabinet (i.e. /SuiteScript/foo.js)
 */
declare function nlapiLoadFile(id: string|number): NLObjFile;
/**
 * Load an existing record from the system.
 * @param {string} type The record type name.
 * @param {number|string} id The internal ID of the record to copy.
 */
declare function nlapiLoadRecord(type: string, id: number|string): NLObjRecord;
/**
 * Loads an existing saved search.
 *
 * @governance 5 units
 * @param {string} type The record type you are searching.
 * @param {string} id The internal ID or script ID of the saved search.
 */
declare function nlapiLoadSearch(type: string, id: string): NLObjSearch;
/**
 * Create an entry in the script execution log (note that execution log entries are automatically purged after 30 days).
 *
 * @param {string} type	Log type: debug|audit|error|emergency
 * @param {string} title Log title (up to 90 characters supported)
 * @param {string} details Log details (up to 3000 characters supported)
 */
declare function nlapiLogExecution(type: string, title: string, details?: string): void;
/**
 * Fetch the value of one or more fields on a record. This API uses search to look up the fields and is much
 * faster than loading the record in order to get the field.
 * @param {string} type The record type name.
 * @param {number} id The internal ID for the record.
 * @param {string|string[]} fields Field or fields to look up.
 * @param {boolean} text If true then the display value is returned instead for select fields.
 */
declare function nlapiLookupField(type: string, id: number, fields: string|string[], text?: boolean): string|Object;
/**
 * Perform a mail merge operation using any template and up to 2 records and returns an nlobjFile with the results.
 * @restriction only supported for record types that are available in mail merge: transactions, entities, custom records, and cases
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {number} id internal ID of template
 * @param {string} baseType primary record type
 * @param {number} baseId internal ID of primary record
 * @param {string} altType secondary record type
 * @param {number} altId internal ID of secondary record
 * @param {Object} fields Object of merge field values to use in the mail merge (by default all field values are obtained from records) which overrides those from the record.
 */
declare function nlapiMergeRecord(id: number, baseType: string, baseId: number, altType?: string, altId?: number, fields?: Object): NLObjFile;
/**
 * This API is deprecated as of NetSuite Version 2008 Release 1.
 *
 * @param {number} id Internal ID of template
 * @param {string} baseType Primary record type
 * @param {number} baseId Internal ID of primary record
 * @param {string} altType Secondary record type
 * @param {number} altId Internal ID of secondary record
 * @param {Object} fields Object of merge field values to use in the mail merge (by default all field values are obtained from records) which overrides those from the record.
 * 
 * @deprecated
 */
declare function nlapiMergeTemplate(id: number, baseType: string, baseId: number, altType?: string, altId?: number, fields?: Object): NLObjFile;
/**
 * Return a URL with a generated OAuth token.
 * @restriction Suitelets and Portlets only
 * @governance 20 units
 *
 * @param {string} ssoAppKey
 */
declare function nlapiOutboundSSO(ssoAppKey: string): string;
/**
 * Print a record (transaction) gievn its type, id, and output format.
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} type Print output type: transaction|statement|packingslip|pickingticket
 * @param {number} id Internal ID of record to print
 * @param {string} format Output format: html|pdf|default
 * @param {Object} properties Object of properties used to configure print
 */
declare function nlapiPrintRecord(type: string, id: number, format?: string, properties?: Object): NLObjFile;
/**
 * Refresh the sublist table.
 * @restriction Only supported for sublists of type inlineeditor, editor, and staticlist
 * @restriction Client SuiteScript only.
 *
 * @param {string} type Sublist name
 */
declare function nlapiRefreshLineItems(type: string): void;
/**
 * Causes a FORM type nlobjPortlet to immediately reload.
 */
declare function nlapiRefreshPortlet(): void;
/**
 * Remove a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 */
declare function nlapiRemoveCurrentLineItemSubrecord(type: string, fldnam: string): void;
/**
 * Remove the currently selected line from the sublist on a page or userevent.
 *
 * @param {string} type Sublist name
 * @param {number} line	Line number to remove (uses current row if null).
 */
declare function nlapiRemoveLineItem(type: string, line?: number): void;
/**
 * Removes a select option (or all if value is null) from a scripted select or multiselect sublist field.
 * @restriction Client SuiteScript only
 *
 * @param {string} type	Sublist name
 * @param {string} fldnam Sublist field name
 * @param {string} value Internal ID for select option to remove
 */
declare function nlapiRemoveLineItemOption(type: string, fldnam: string, value: string): void;
/**
 * Removes a select option (or all if value is null) from a scripted select or multiselect field.
 * @restriction Client SuiteScript only
 *
 * @param {string} fldnam Field name
 * @param {string} value Internal ID of select option to remove
 */
declare function nlapiRemoveSelectOption(fldnam: string, value: string): void;
/**
 * Remove a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam body field name
 */
declare function nlapiRemoveSubrecord(fldnam: string): void;
/**
 * Request a URL to an external or internal resource.
 * @param {string} url A fully qualified URL to an HTTP(s) resource.
 * @param {string|Object} postdata A string, document, or Object containing POST payload.
 * @param {Object} headers Object containing request headers.
 * @param {function} callback Available on the Client to support asynchronous requests. Function is passed an nlobjServerResponse with the results.
 * @param {string} method HTTP method: GET, POST, PUT, DELETE, etc.
 */
declare function nlapiRequestURL(url: string, postdata: string|Object, headers: Object, callback: Function, method: string): NLObjServerResponse;
/**
 * Allows you to send credentials outside of NetSuite. This API securely accesses a handle to credentials that users specify in a NetSuite credential field.
 * @param {string[]} credentials List of credential handles.
 * @param {string} url A fully qualified URL to an HTTP(s) resource.
 * @param {string|Object} postdata A string, document, or Object containing POST payload.
 * @param {Object} headers Object containing request headers.
 * @param {string} method HTTP method: GET, POST, PUT, DELETE, etc.
 */
declare function nlapiRequestURLWithCredentials(credentials: string[], url: string, postdata: string|Object, headers: Object, method: string): NLObjServerResponse;
/**
 * Causes a custom form portlet to be resized.
 */
declare function nlapiResizePortlet(): void;
/**
 * Resolve a URL to a resource or object in the system.
 * @param {string} type Type specifier for URL: SUITELET|TASKLINK|RECORD|MEDIAITEM.
 * @param {string} subtype Subtype specifier for URL (corresponding to type): scriptid|taskid|recordtype|mediaid.
 * @param {string} id Internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a.
 * @param {string} pagemode String specifier used to configure page (suitelet: external|internal, tasklink|record: edit|view).
 */
declare function nlapiResolveURL(type: string, subtype: string, id: string, pagemode?: string): string;
/**
 * Queue a scheduled script for immediate execution and return the status QUEUED if successfull.
 * @restriction Server SuiteScript only
 * @governance 20 units
 *
 * @param {string|number} script Script ID or internal ID of scheduled script
 * @param {string|number} deployment Script ID or internal ID of scheduled script deployment. If empty, the first "free" deployment (i.e. status = Not Scheduled or Completed) will be used
 * @param {Object} arameters Object of parameter name->values used in this scheduled script instance
 * @return {string} QUEUED or null if no available deployments were found or the current status of the deployment specified if it was not available.
 */
declare function nlapiScheduleScript(script: string|number, deployment?: string|number, parameters?: Object): string;
/**
 * Perform a duplicate record search using Duplicate Detection criteria.
 * @param {string} type The recordType you are checking duplicates for (for example, customer|lead|prospect|partner|vendor|contact).
 * @param {string[]} fields Array of field names used to detect duplicate (for example, companyname|email|name|phone|address1|city|state|zipcode).
 * @param {number} id Internal ID of existing record. Depending on the use case, id may or may not be a required argument.
 */
declare function nlapiSearchDuplicate(type: string, fields?: string[], id?: number): NLObjSearchResult[];
/**
 * Perform a global record search across the system.
 * @param {string} keywords Global search keywords string or expression.
 */
declare function nlapiSearchGlobal(keywords: string): NLObjSearchResult[];
/**
 * Perform a record search using an existing search or filters and columns.
 * @param {string} type The Record Type Id.
 * @param {number|string} id The internal ID or script ID for the saved search to use for search.
 * @param {NLObjSearchFilter|NLObjSearchFilter[]} filters A single filter object or an array of filter objects.
 * @param {NLObjSearchColumn|NLObjSearchColumn[]} columns A single column object or an array of column objects.
 */
declare function nlapiSearchRecord(
    type:     string,
    id?:      number|string,
    filters?: NLObjSearchFilter|NLObjSearchFilter[],
    columns?: NLObjSearchColumn|NLObjSearchColumn[]
): NLObjSearchResult[];
/**
 * Select an existing line in a sublist.
 *
 * @param {string} type Sublist name
 * @param {number} linenum Line number to select
 */
declare function nlapiSelectLineItem(type: string, linenum: number): void;
/**
 * Select a new line in a sublist.
 * @restriction Only supported for sublists of type inlineeditor and editor
 *
 * @param {string} type Sublist name
 */
declare function nlapiSelectNewLineItem(type: string): void;
/**
 * Select a node from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {Node} 	node node being queried
 * @param {string} 	xpath string containing XPath expression.
 */
declare function nlapiSelectNode(node: Node, xpath: string): Node;
/**
 * Select an array of nodes from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {Node} 	node Node being queried
 * @param {string} 	xpath string containing XPath expression.
 */
declare function nlapiSelectNodes(node: Node, xpath: string): Node[];
/**
 * Select a value from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {Node} node Node being queried
 * @param {string} xpath String containing XPath expression.
 */
declare function nlapiSelectValue(node: Node, xpath: string): string;
/**
 * Select an array of values from an XML node using XPath. Supports custom namespaces (nodes in default namespace can be referenced using "nlapi" as the prefix)
 *
 * @param {Node} node Node being queried
 * @param {string} xpath String containing XPath expression.
 */
declare function nlapiSelectValues(node: Node, xpath: string): string[];
/**
 * Sends a single on-demand campaign email to a specified recipient and returns a campaign response ID to track the email.
 * @param {number} campaigneventid Internal ID of the campaign event.
 * @param {number} recipientid Internal ID of the recipient - the recipient must have an email.
 */
declare function nlapiSendCampaignEmail(campaigneventid: number, recipientid: number): number;
/**
 * Send out an email and associate it with records in the system.
 * Supported base types are entity for entities, transaction for transactions, activity for activities and cases, record|recordtype for custom records.
 * @param {number} from Internal ID for employee user on behalf of whom this email is sent
 * @param {string|number} to Email address or internal ID of user that this email is being sent to.
 * @param {string} subject Email Subject.
 * @param {string} body Email body.
 * @param {string|string[]} cc Copy email address(es).
 * @param {string|string[]} bcc Blind copy email address(es).
 * @param {Object} records Object of base types -> internal IDs used to associate email to records. i.e. {entity: 100, record: 23, recordtype: customrecord_surveys}.
 * @param {NLObjFile[]} files Array of nlobjFile objects (files) to include as attachments.
 * @param {boolean} notifySenderOnBounce Controls whether or not the sender will receive email notification of bounced emails (defaults to false).
 * @param {boolean} internalOnly Controls or not the resultingMmessage record will be visible to non-employees on the Communication tab of attached records (defaults to false).
 * @param {string} replyTo Email reply-to address.
 */
declare function nlapiSendEmail(
    from: number,
    to: string|number,
    subject: string,
    body: string,
    cc?: string|string[],
    bcc?: string|string[],
    records?: Object,
    files?: NLObjFile[],
    notifySenderOnBounce?: boolean,
    internalOnly?: boolean,
    replyTo?: string
): void;
/**
 * Send out a fax and associate it with records in the system. This requires fax preferences to be configured.
 * @param {number} from Internal ID for employee user on behalf of whom this fax is sent.
 * @param {number|string} to Fax address or internal ID of user that this fax is being sent to.
 * @param {string} subject Fax subject.
 * @param {string} body Fax body.
 * @param {Object} records Object of base types -> internal IDs used to associate fax to records. i.e. {entity: 100, record: 23, recordtype: customrecord_surveys}.
 * @param {NLObjFile[]} files Array of nlObjFile objects (files) to include as attachments.
 */
declare function nlapiSendFax(from: number, to: string|number, subject: string, body: string, records?: Object, files?: NLObjFile[]): void;
/**
 * Set the value of a field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type Sublist name
 * @param {string} fldnam Sublist field name
 * @param {string} value Field value
 * @param {string} timezone Timezone
 */
declare function nlapiSetCurrentLineItemDateTimeValue(type: string,fldnam: string, value: string, timezone?: string): void;
/**
 * Set the current value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @restriction synchronous arg is only supported in Client SuiteScript
 *
 * @param {string} 	type Sublist name
 * @param {string} 	fldnam Sublist field name
 * @param {number} 	column Matrix column index (1-based)
 * @param {string} 	value Matrix field value
 * @param {boolean} firefieldchanged If false then the field change event is suppressed (defaults to true)
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetCurrentLineItemMatrixValue(type: string, fldnam: string, column: number, value: string, firefieldchanged?: boolean, synchronous?: boolean): void;
/**
 * Set the value of a field on the currently selected line using it's label.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type Sublist name
 * @param {string} fldnam Sublist field name
 * @param {string} txt String containing display value or search text.
 * @param {boolean} firefieldchanged If false then the field change event is suppressed (defaults to true)
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetCurrentLineItemText(type: string, fldnam: string, txt: string, firefieldchanged?: boolean, synchronous?: boolean): void;
/**
 * Set the value of a field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type Sublist name
 * @param {string} fldnam Sublist field name
 * @param {string} value Field value
 * @param {boolean} firefieldchanged If false then the field change event is suppressed (defaults to true)
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetCurrentLineItemValue(type: string, fldnam: string, value: string, firefieldchanged?: boolean, synchronous?: boolean): void;
/**
 * Set the value of a multi-select field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type Sublist name
 * @param {string} fldnam sublist field name
 * @param {string[]} values Field values
 * @param {boolean} firefieldchanged If false then the field change event is suppressed (defaults to true)
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetCurrentLineItemValues(type: string, fldnam: string, values: string[], firefieldchanged?: boolean, synchronous?: boolean): void;
/**
 * Set the values of a date/time field.
 *
 * @param {string} fieldId the internal field ID of a datetime field
 * @param {string} The date and time in format mm/dd/yyyy hh:mm:ss am|pm
 * @param {string|number} [timeZone] One of values (string) or keys (int) from the Olson Values table.
 */
declare function nlapiSetDateTimeValue(fieldId: string, value: string, timezone?: string|number): void;
/**
 * Set the value of a field on the current record on a page using it's label.
 * @param {string} fldnam The field name.
 * @param {string} txt Display name used to lookup field value.
 * @param {boolean} firefieldchanged If false then the field change event is suppressed (defaults to true).
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetFieldText(fldnam: string, txt: string, firefieldchanged?: boolean, synchronous?: boolean): void;
/**
 * Set the values (via display text) of a multiselect field on the current record on a page.
 * @param {string} fldnam The field name.
 * @param {string[]} texts Array of strings containing display values for field.
 * @param {boolean} firefieldchanged If false then the field change event is suppressed (defaults to true).
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetFieldTexts(fldnam: string, texts: string[], firefieldchanged?: boolean, synchronous?: boolean): void;
/**
 * Set the value of a field on the current record on a page.
 * @param {string} fldnam The field name.
 * @param {string} value Value used to set field.
 * @param {boolean} firefieldchanged If false then the field change event is suppressed (defaults to true).
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetFieldValue(fldnam: string, value: string, firefieldchanged?: boolean, synchronous?: boolean): void;
/**
 * Set the values of a multiselect field on the current record on a page.
 * @param {string} fldnam The field name.
 * @param {string[]} values Array of strings containing values for field.
 * @param {boolean} firefieldchanged If false then the field change event is suppressed (defaults to true).
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetFieldValues(fldnam: string, values: string[], firefieldchanged?: boolean, synchronous?: boolean): void;
/**
 * Set the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type Sublist name
 * @param {string} 	fldnam Sublist field name
 * @param {number} 	linenum Line number (1-based)
 * @param {string}  datetime Date/Time value
 * @param {string}  timezone Timezone
 */
declare function nlapiSetLineItemDateTimeValue(type: string, fldnam: string, linenum: number, datetime: string, timezone?: string): void;
/**
 * Undocumented function that disables a line item column.  Best used in lineInit().
 * @param {string} type Sublist Id.
 * @param {string} fldnam Column Id.
 * @param {boolean} val True to disable, false to enable.
 * @param {number} linenum 
 */
declare function nlapiSetLineItemDisabled(type: string, fldnam: string, val: boolean, linenum?: number): void;
/**
 * Set the value of a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type Sublist name
 * @param {string} 	fldnam Sublist field name
 * @param {number} 	linenum Line number (1-based)
 * @param {string} value
 */
declare function nlapiSetLineItemValue(type: string, fldnam: string, linenum: number, value: string): void;
/**
 * Set the value of a matrix header field.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 	type Sublist name.
 * @param {string} 	fldnam Sublist field name.
 * @param {number} 	column Matrix column index (1-based).
 * @param {string} 	value Field value for matrix field.
 * @param {boolean} firefieldchanged If false then the field change event is suppressed (defaults to true).
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2009.2
 */
declare function nlapiSetMatrixValue(type: string, fldnam: string, column: number, value: string, firefieldchanged?: boolean, synchronous?: boolean): void;
/**
 * Creates a recovery point saving the state of the script's execution.
 */
declare function nlapiSetRecoveryPoint(): Object;
/**
 * Convert a String into a Date object.
 *
 * @param {string} str Date string in the user's date format, timeofday format, or datetime format.
 * @param {string} format Format type to use: date|datetime|timeofday with date being the default.
 */
declare function nlapiStringToDate(str: string, format?: string): Date;
/**
 * Convert a String into an XML document. Note that in Server SuiteScript XML is supported natively by the JS runtime using the e4x standard (http://en.wikipedia.org/wiki/E4X)
 * This makes scripting XML simpler and more efficient
 *
 * @param {string} str String being parsed into an XML document
 */
declare function nlapiStringToXML(str: string): XMLDocument;
/**
 * Commits all changes to a configuration record.
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {nlobjConfiguration} setup Record
 */
declare function nlapiSubmitConfiguration(setup: NLObjConfiguration): void;
/**
 * Submits a CSV import job to asynchronously import record data into NetSuite.
 *
 * @param {nlobjSCVImport} csvImport
 */
declare function nlapiSubmitCSVImport(csvImport: NLObjCSVImport): string;
/**
 * Submit the values of a field or set of fields for an existing record.
 * @param {string} type The record type name.
 * @param {number} id The internal ID for the record.
 * @param {string|string[]} fields Field or fields being updated.
 * @param {string|string[]} values Field value or field values for updating.
 * @param {boolean} doSourcing If not set, this argument defaults to false and field sourcing does not occur.
 */
declare function nlapiSubmitField(type: string, id: number, fields: string|string[], values: string|string[], doSourcing?: boolean): void;
/**
 * Add/update a file in the file cabinet.
 * @governance 20 units
 * @restriction Server SuiteScript only
 *
 * @param {NLObjFile} file A file object to submit
 */
declare function nlapiSubmitFile(file: NLObjFile): number;
/**
 * Submit a record to the system for creation or update.
 * @param {NLObjRecord} record Record object containing the data record.
 * @param {boolean} doSourcing If not set, defaults to false.
 * @param {boolean} ignoreMandatoryFields Disables mandatory field validation for this submit operation.
 */
declare function nlapiSubmitRecord(record: NLObjRecord, doSourcing?: boolean, ignoreMandatoryFields?: boolean): string;
/**
 * Create a new record using values from an existing record of a different type.
 * @param {string} type The record type name to transform from.
 * @param {number} id The internal ID for the record.
 * @param {string} transformType The recordType you are transforming the existing record into.
 * @param {Object} transformValues An object containing transform default option/value pairs used to pre-configure transformed record.
 */
declare function nlapiTransformRecord(type: string, id: number, transformType: string, transformValues?: Object): NLObjRecord;
/**
 * Triggers a workflow on a record.
 * @governance 20 units
 *
 * @param {string} recordtype Record type ID of the workflow base record
 * @param {number} id Internal ID of the base record
 * @param {string|number} workflowid Internal ID or script ID for the workflow definition
 * @param {string|number} actionid Internal ID or script ID of the action script
 * @param {string|number} stateid Internal ID or script ID of the state contains the referenced add button action
 */
declare function nlapiTriggerWorkflow(recordtype: string, id: number, workflowid: string|number, actionid: string|number, stateid: string|number): number;
/**
 * Validate that a given XML document conforms to a given XML schema. XML Schema Definition (XSD) is the expected schema format.
 *
 * @param {XMLDocument} xmlDocument xml to validate
 * @param {XMLDocument} schemaDocument schema to enforce
 * @param {string} schemaFolderId if your schema utilizes <import> or <include> tags which refer to sub-schemas by file name (as opposed to URL),
 *                 provide the Internal Id of File Cabinet folder containing these sub-schemas as the schemaFolderId argument
 * @throws {nlobjError} error containsing validation failure message(s) - limited to first 10
 */
declare function nlapiValidateXML(xmlDocument: XMLDocument, schemaDocument: XMLDocument, schemaFolderId: string): void;
/**
 * View a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	type sublist name
 * @param {string} 	fldnam sublist field name
 */
declare function nlapiViewCurrentLineItemSubrecord(type: string, fldnam: string): NLObjSubrecord;
/**
 * View a subrecord on a sublist field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} type sublist name
 * @param {string} fldnam sublist field name
 * @param {number} linenum
 */
declare function nlapiViewLineItemSubrecord(type: string, fldnam: string, linenum: number): NLObjSubrecord;
/**
 * view a subrecord on body field on the current record on a page.
 * @restriction supported in client and user event scripts only.
 * @param {string} 	fldnam Body field name.
 */
declare function nlapiViewSubrecord(fldname: string): NLObjSubrecord;
/**
 * Void a transaction based on type and id.
 * @param {string} type The transaction type name.
 * @param {string} id The internal ID for the record.
 * @return {string} If accounting preference is reversing journal, then it is new journal id, otherwise, it is the input record id.
 */
declare function nlapiVoidTransaction(type: string, id: string): string;
/**
 * Generate a PDF from XML using the BFO report writer (see http://big.faceless.org/products/report/).
 * @restriction Server SuiteScript only
 * @governance 10 units
 *
 * @param {string} input String containing BFO compliant XHTML
 */
declare function nlapiXMLToPDF(input: string): NLObjFile;
/**
 * Convert an XML document into a String.  Note that in Server SuiteScript XML is supported natively by the JS runtime using the e4x standard (http://en.wikipedia.org/wiki/E4X)
 * This makes scripting XML data simpler and more efficient
 *
 * @param {XMLDocument} xml Document being serialized into a string
 */
declare function nlapiXMLToString(xml: XMLDocument): string;
/**
 * Creates a recovery point and then reschedules the script.
 */
declare function nlapiYieldScript(): Object;
/**
 * Client method to submit the current record (undocumented NetSuite method).
 * @param {string} name The name of the save button to trigger.
 * @param {boolean} arg2 Not really sure what this parameter is used for.
 */
declare function NLDoMainFormButtonAction(name: string, arg2: boolean): void;
