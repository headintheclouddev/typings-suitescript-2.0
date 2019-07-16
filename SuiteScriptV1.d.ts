/** UI Object page type used to build multi-step "assistant" pages to simplify complex workflows. All data and state for an assistant is tracked automatically throughout the user's session up until completion of the assistant. */
interface NLObjAssistant {
    /**
     * Add a field to this page and return it.
     * @param {string} name field name
     * @param {string} type field type
     * @param {string} label field label
     * @param {number|string} source script ID or internal ID for source list (select and multiselects only) -or- radio value for radio fields
     * @param {string} group group name that this field will live on. If empty then the field is added to the main section of the page
     */
    addField(name: string, type: string, label?: string, source?: number|string, group?: string): NLObjField;
    /**
     * Add a field group to the page.
     * @param {string} name field group name
     * @param {string} label field group label
     */
    addFieldGroup(name: string, label: string): NLObjFieldGroup;
    /**
     * Add a step to the assistant.
     * @param {string} name the name of the step
     * @param {string} label label used for this step
     */
    addStep(name: string, label: string): NLObjAssistantStep;
    /**
     * Add a sublist to this page and return it. For now only sublists of type inlineeditor are supported
     * @param {string} name sublist name
     * @param {string} type sublist type (inlineeditor only for now)
     * @param {string} label sublist label
     */
    addSubList(name: string, type: string, label: string): NLObjSubList;
    /**
     * Return an array of the names of all field groups on this page.
     */
    getAllFieldGroups(): string[];
    /**
     * Return an array of the names of all fields on this page.
     */
    getAllFields(): string[];
    /**
     * Return an array of all the assistant steps for this assistant.
     */
    getAllSteps(): NLObjAssistantStep[];
    /**
     * Return an array of the names of all sublists on this page .
     */
    getAllSubLists(): string[];
    /**
     * Return current step set via nlobjAssistant.setCurrentStep(step)
     */
    getCurrentStep(): NLObjAssistantStep;
    /**
     * Return a field on this page.
     * @param {string} name field name
     */
    getField(name: string): NLObjField;
    /**
     * Return a field group on this page.
     * @param {string} name field group name
     */
    getFieldGroup(name: string): NLObjFieldGroup;
    /**
     * Return the last submitted action by the user: next|back|cancel|finish|jump
     */
    getLastAction(): string;
    /**
     * Return step from which the last submitted action came from
     */
    getLastStep(): NLObjAssistantStep;
    /**
     * Return the next logical step corresponding to the user's last submitted action. You should only call this after
     * you have successfully captured all the information from the last step and are ready to move on to the next step. You
     * would use the return value to set the current step prior to continuing.
     */
    getNextStep(): NLObjAssistantStep;
    /**
     * Return an assistant step on this page.
     * @param {string} name step name
     */
    getStep(name: string): NLObjAssistantStep;
    /**
     * Return the total number of steps in the assistant.
     */
    getStepCount(): number;
    /**
     * Return a sublist on this page.
     * @param {string} name sublist name
     */
    getSubList(name: string): NLObjSubList;
    /**
     * Return true if the assistant has an error message to display for the current step.
     */
    hasError(): boolean;
    /**
     * Return true if all the steps have been completed.
     */
    isFinished(): boolean;
    /**
     * Redirect the user following a user submit operation. Use this to automatically redirect the user to the next logical step.
     * @param {NLObjResponse} response The response object used to communicate back to the user's client
     */
    sendRedirect(response: NLObjResponse): void;
    /**
     * Mark a step as current. It will be highlighted accordingly when the page is displayed
     * @param {NLObjAssistantStep} step Assistant step object representing the current step that the user is on.
     */
    setCurrentStep(step: NLObjAssistantStep): void;
    /**
     * Set the error message for the current step.
     * @param {string} html Error message (rich text) to display on the page to the user.
     */
    setError(html: string): void;
    /**
     * Set the values for all the fields on this page.
     * @param {Object} values Object of field name/value pairs used to set all fields on page.
     */
    setFieldValues(values: Object): void;
    /**
     * Mark assistant page as completed and optionally set the rich text to display on completed page.
     * @param {string} html Completion message (rich text) to display on the "Finish" page.
     */
    setFinished(html: string): void;
    /**
     * If numbered, step numbers are displayed next to the step's label in the navigation area.
     * @param {boolean} numbered If true (default assistant behavior) step numbers will be displayed next to the step label.
     */
    setNumbered(numbered: boolean): void;
    /**
     * If ordered, steps are show on left and must be completed sequentially, otherwise steps are shown on top and can be done in any order
     * @param {boolean} ordered	If true (default assistant behavior) then a navigation order thru the steps/pages will be imposed on the user. Otherwise the user will be allowed to navigate across steps/pages in any order they choose.
     */
    setOrdered(ordered: boolean): void;
    /**
     * Set the script ID for Client Script used for this form.
     * @param {string|number} script Script ID or internal ID for global client script used to enable Client SuiteScript on page.
     */
    setScript(script: string|number): void;
    /**
     * Show/hide shortcut link. Always hidden on external pages.
     * @param {boolean} show Enable/disable "Add To Shortcut" link on this page.
     */
    setShortcut(show: boolean): void;
    /**
     * Set the splash screen used for this page.
     * @param {string} title splash portlet title
     * @param {string} text1 splash portlet content (left side)
     * @param {string} text2 splash portlet content (right side)
     */
    setSplash(title: string, text1: string, text2?: string): void;
    /**
     * Set the page title.
     * @param {string} title
     */
    setTitle(title: string): void;
}

/** Assistant Step Definition. Used to define individual steps/pages in multi-step workflows. */
interface NLObjAssistantStep {
    /**
     * Return an array of the names of all fields entered by the user during this step.
     */
    getAllFields(): string[];
    /**
     * Return an array of the names of all sublist fields entered by the user during this step
     * @param {string} group sublist name
     */
    getAllLineItemFields(group: string): string[];
    /**
     * Return an array of the names of all sublists entered by the user during this step.
     */
    getAllLineItems(): string[];
    /**
     * Return the value of a field entered by the user during this step.
     * @param {string} name field name
     */
    getFieldValue(name: string): string;
    /**
     * Return the selected values of a multi-select field as an Array entered by the user during this step.
     * @param {string} name multi-select field name
     */
    getFieldValues(name: string): string[];
    /**
     * Return the number of lines previously entered by the user in this step (or -1 if the sublist does not exist).
     * @param {string} group sublist name
     */
    getLineItemCount(group: string): number;
    /**
     * Return the value of a sublist field entered by the user during this step.
     * @param {string} group sublist name
     * @param {string} name sublist field name
     * @param {number} line sublist (1-based)
     */
    getLineItemValue(group: string, name: string, line: number): string;
    /**
     * Return the index of this step in the assistant page (1-based).
     */
    getStepNumber(): number;
    /**
     * Set helper text for this assistant step.
     * @param {string} help inline help text to display on assistant page for this step
     */
    setHelpText(help: string): NLObjAssistantStep
    /**
     * Set the label for this assistant step.
     * @param {string} label display label used for this assistant step
     */
    setLabel(label: string): void;

}

/** Buttons used for triggering custom behaviors on pages. */
interface NLObjButton {
    /**
     * Disable or enable button.
     * @param {boolean} disabled If true then this button should be disabled on the page.
     */
    setDisabled(disabled: boolean): NLObjButton;
    /**
     * Set the label for this button.
     * @param {string} label display label for button
     */
    setLabel(label: string): NLObjButton;
    /**
     * Sets the button as hidden in the UI. This API is supported on custom buttons and on some standard NetSuite buttons
     * @param {boolean} visible Defaults to true if not set. If set to false, the button will be hidden in the UI.
     */
    setVisible(visible: boolean): NLObjButton;
}

interface NLObjCache {
    get(key: string): string;
    /**
     * @param {string} key
     * @param {string} value
     * @param {number} ttl, time to live in seconds.
     */
    put(key: string, value: string, ttl: number): Object;
    remove(key: string): Object;
}

/** For columns used on scriptable lists and list portlets. */
interface NLObjColumn {
    /**
     * Add a URL parameter (optionally defined per row) to this column's URL.
     *
     * @param {string} param the name of a parameter to add to URL
     * @param {string} value the value of the parameter to add to URL -or- a column in the datasource that returns the parameter value for each row
     * @param {boolean} perRow if true then the 2nd arg is expected to be a column in the datasource
     */
    addParamToURL(param: string, value: string, perRow?: boolean): void;
    /**
     * Set the header name for this column.
     *
     * @param {string} label The label for this column.
     */
    setLabel(label: string): void;
    /**
     * Set the base URL (optionally defined per row) for this column.
     *
     * @param {string} value the base URL or a column in the datasource that returns the base URL for each row
     * @param {boolean} perRow if true then the 1st arg is expected to be a column in the datasource
     */
    setURL(value: string, perRow?: boolean): void;
}

/** For interacting with setup/configuration pages. */
interface NLObjConfiguration {
    /**
     * Return an Array of all field names on the record.
     */
    getAllFields(): string[];
    /**
     * Return the type corresponding to this setup record.
     */
    getType(): string;
    /**
     * Return field metadata for field.
     *
     * @param {string} fldnam field name
     */
    getField(fldnam: string): NLObjField;
    /**
     * Return the text value of a field.
     * @restriction only supported for select fields
     *
     * @param {string} name field name
     */
    getFieldText(name: string): string;
    /**
     * Return the selected text values of a multi-select field as an Array.
     * @param {string} name field name
     */
    getFieldTexts(name: string): string[];
    /**
     * Return the value of a field.
     *
     * @param {string} name field name
     */
    getFieldValue(name: string): string;
    /**
     * Return the selected values of a multi-select field as an Array.
     * @restriction only supported for multi-select fields
     *
     * @param {string} name field name
     */
    getFieldValues(name: string): string[];
    /**
     * Set the value of a field.
     *
     * @param {string} name field name
     * @param {string} value field value
     */
    setFieldValue(name: string, value: string): void;
    /**
     * Set the values of a multi-select field.
     * @restriction only supported for multi-select fields
     *
     * @param {string} name field name
     * @param {string[]} values field values
     */
    setFieldValues(name: string, values: string[]): void;
    /**
     * Set the value (via display value) of a field.
     * @restriction only supported for select fields
     *
     * @param {string} name field name
     * @param {string} text field display text
     */
    setFieldText(name: string, text: string): void;
    /**
     * Set the values (via display values) of a multi-select field.
     * @restriction only supported for multi-select fields
     *
     * @param {string} name Field name.
     * @param {string[]} texts Array of field display text values.
     */
    setFieldTexts(name: string, texts: string[]): void;
}

/** Utility class providing information about the current user and the script runtime. */
interface NLObjContext {
    /**
     * Return the account ID of the current user.
     */
    getCompany(): string;
    /**
     * Return the deployment ID for the current script.
     */
    getDeploymentId(): string;
    /**
     * Return the internalId of the current user's department.
     */
    getDepartment(): number;
    /**
     * Return the email address of the current user.
     */
    getEmail(): string;
    /**
     * Return the environment that the script is executing in: SANDBOX, PRODUCTION, BETA, INTERNAL.
     */
    getEnvironment(): string;
    /**
     * Return the execution context for this script: webServices|csvImport|client|userInterface|scheduledScript|portlet|suitelet|debugger|custommassupdate
     */
    getExecutionContext(): string;
    /**
     * Return true if feature is enabled, false otherwise.
     * @param {string} name
     */
    getFeature(name: string): boolean;
    /**
     * Return the internalId of the current user's location.
     */
    getLocation(): number;
    /**
     * Return the logging level for the current script execution. Not supported in CLIENT scripts.
     */
    getLogLevel(): string;
    /**
     * Return the name of the current user.
     */
    getName(): string;
    /**
     * Return the % complete specified for the current scheduled script execution.
     */
    getPercentComplete(): number;
    /**
     * Return current user's permission level (0-4) for this permission.
     * @param {string} name
     */
    getPermission(name: string): number;
    /**
     * Return system or script preference selection for current user.
     * @param {string} name
     */
    getPreference(name: string): string;
    /**
     * Returns the number of scheduled script queues in a given account.
     */
    getQueueCount(): number;
    /**
     * Return the amount of usage units remaining for this script.
     */
    getRemainingUsage(): number;
    /**
     * Return the internalId of the current user's role.
     */
    getRole(): string;
    /**
     * Return the internalId of the current user's center type.
     */
    getRoleCenter(): string;
    /**
     * Return the script ID of the current user's role.
     */
    getRoleId(): string;
    /**
     * Return the script ID for the current script.
     */
    getScriptId(): string;
    /**
     * Return value of session object set by script.
     * @param {string} name
     */
    getSessionObject(name: string): string;
    /**
     * Return a system/script setting. Types are SCRIPT, SESSION, FEATURE, PERMISSION.
     *
     * @param {string} type
     * @param {string} name
     *
     * @deprecated
     */
    getSetting(type: string, name: string): string;
    /**
     * Return the internalId of the current user's subsidiary.
     */
    getSubsidiary(): number;
    /**
     * Return the internalId of the current user.
     */
    getUser(): string;
    /**
     * Return the NetSuite version for the current account.
     */
    getVersion(): string;
    /**
     * Set the % complete for the current scheduled script execution.
     * @param {number} pct The percentage of records completed
     */
    setPercentComplete(pct: number): void;
    /**
     * Set the value of a session object using a key.
     * @param {string} name
     * @param {string} value
     */
    setSessionObject(name: string, value: string): void;
    /**
     * Set a system/script setting. Only supported type is SESSION.
     *
     * @param {string} type
     * @param {string} name
     * @param {string} value
     *
     * @deprecated
     */
    setSetting(type: string, name: string, value: string): void;
}

/**
 * Return a new instance of nlobjCredentialBuilder
 *
 * @classDescription The nlobjCredentialBuilder object encapsulates a request string that can be passed to nlapiRequestURLWithCredentials(credentials, url, postdata, headers, httpsMethod).
 * @param {string} request can include an embedded GUID (globally unique string).
 * @param {string} domain URL’s host name. Host name must exactly match the host name in your URL.
 *
 * @constructor
 */
declare function nlobjCredentialBuilder(request: string, domain: string): NLObjCredentialBuilder;
interface NLObjCredentialBuilder {
    /**
     * Appends a passed in string to an nlobjCredentialBuilder object.
     *
     * @param {string} string String to be appended.
     */
    append(string: string): NLObjCredentialBuilder;
    /**
     * Encodes an nlobjCredentialBuilder object per the base64 scheme.
     */
    base64(): NLObjCredentialBuilder;
    /**
     * Hashes an nlobjCredentialBuilder object with the MD5 hash function.
     */
    md5(): NLObjCredentialBuilder;
    /**
     * Replaces all instances of string1 with string2.
     *
     * @param {string} string1 String to be replaced
     * @param {string} string2 String to be replaced with
     */
    replace(string1: string, string2: string): NLObjCredentialBuilder;
    /**
     * Hashes an nlobjCredentialBuilder object with the SHA-256 hash function.
     */
    sha256(): NLObjCredentialBuilder;
    /**
     * Encodes an nlobjCredentialBuilder object per the UTF-8 scheme.
     */
    utf8(): NLObjCredentialBuilder;
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

interface NLObjDuplicateJobRequest {
    setEntityType(entityType: string): void;
    setMasterId(masterID: string): void;
    setMasterSelectionMode(masterSelectionMode: string): void;
    setOperation(operation: string): void;
    setRecords(dupeRecords: string[]): void;
}

interface NLObjEmailMerger {
    /**
     * Perform the merge and return an object containing email subject and body.
     * @governance 20 units
     */
    merge(): { subject: string, body: string };
    /**
     * Associate a custom record to the merger.
     * @param {string} recordType type of the custom record
     * @param {number} recordId ID of the record to be associated with the merger
     */
    setCustomRecord(recordType: string, recordId: number): void;
    /**
     * Associate an entity to the merger.
     * @param {string} entityType type of the entity (customer/contact/partner/vendor/employee)
     * @param {number} entityId ID of the entity to be associated with the merger
     */
    setEntity(entityType: string, entityId: number): void;
    /**
     * Associate a second entity (recipient) to the merger.
     * @param {string} recipientType type of the entity (customer/contact/partner/vendor/employee)
     * @param {number} recipientId ID of the entity to be associated with the merger
     */
    setRecipient(recipientType: string, recipientId: number): void;
    /**
     * Associate a support case to the merger.
     * @param {number} caseId ID of the support case to be associated with the merger
     */
    setSupportCase(caseId: number): void;
    /**
     * Associate a transaction to the merger
     * @param {number} transactionId ID of the transaction to be associated with the merger
     */
    setTransaction(transactionId: number): void;
}

/**
 * Return a new instance of nlobjError used system or user-defined error object.
 *
 * @classDescription Encapsulation of errors thrown during script execution.
 *
 * @constructor
 */
declare function nlobjError(): NLObjError;
interface NLObjError {
    /**
     * Return the error code for this system or user-defined error.
     */
    getCode(): string;
    /**
     * Return the error description for this error.
     */
    getDetails(): string;
    /**
     * Return the error db ID for this error (if it was an unhandled unexpected error).
     */
    getId(): string;
    /**
     * Return the internalid of the record if this error was thrown in an aftersubmit script.
     */
    getInternalID(): number;
    /**
     * Return a stacktrace containing the location of the error.
     */
    getStackTrace(): string[];
    /**
     * Return the userevent script name where this error was thrown.
     */
    getUserEvent(): string;
}

interface NLObjField {
    /**
     * Add a select option to this field (valid for select/multiselect fields). This method is only supported on scripted fields via the UI Object API.
     *
     * @param {string} value internal ID for this select option
     * @param {string} text display value for this select option
     * @param {boolean} selected if true then this select option will be selected by default
     */
    addSelectOption(value: string, text: string, selected?: boolean): void;
    /**
     * Return field label.
     */
    getLabel(): string;
    /**
     * Return field name.
     */
    getName(): string;
    /**
     * This method can only be used in server contexts against a record object. Also note that a call to this method may return different results for the same field for different roles.
     *
     * @param {string} filter A search string to filter the select options that are returned.
     * @param {string} filteroperator Supported operators are contains | is | startswith. If not specified, defaults to the contains operator.
     */
    getSelectOptions(filter?: string, filteroperator?: string): NLObjSelectOption[];
    /**
     * Return field type.
     */
    getType(): string;
    /**
     * Set the alias used to set the value for this field. Defaults to field name. This method is only supported on scripted fields via the UI Object API.
     *
     * @param {string} alias Column used to populate the field (mostly relevant when populating sublist fields).
     */
    setAlias(alias: string): NLObjField;
    /**
     * Set the break type (startcol|startrow|none) for this field. startrow is only used for fields with a layout type of outside. This method is only supported on scripted fields via the UI Object API.
     *
     * @param {string} breaktype Break type used to add a break in flow layout for this field: startcol | startrow | none.
     */
    setBreakType(breaktype: string): NLObjField;
    /**
     * Set the default value for this field. This method is only supported on scripted fields via the UI Object API.
     *
     * @param {string} value
     */
    setDefaultValue(value: string): NLObjField;
    /**
     * Set the width and height for this field. This method is only supported on scripted fields via the UI Object API.
     *
     * @param {number} width
     * @param {number} height
     */
    setDisplaySize(width: number, height?: number): NLObjField;
    /**
     * Set the display type for this field. This method is only supported on scripted fields via the UI Object API
     *
     * @param {string} type display type: inline|normal|hidden|disabled|readonly|entry
     */
    setDisplayType(type: string): NLObjField;
    /**
     * Set help text for this field. If inline is set on assistant pages, help is displayed inline below field. This method is only supported on scripted fields via the UI Object API.
     *
     * @param {string} help	Field level help content (rich text) for field.
     * @param {string} inline If true then in addition to the popup field help, the help will also be displayed inline below field (supported on assistant pages only).
     */
    setHelpText(help: string, inline?: boolean): NLObjField;
    /**
     * Set the label for this field. This method is only supported on scripted fields via the UI Object API.
     *
     * @param {string} label
     */
    setLabel(label: string): NLObjField;
    /**
     * Set the layout type and optionally the break type. This method is only supported on scripted fields via the UI Object API
     *
     * @param {string} type Layout type: outside|startrow|midrow|endrow|normal
     * @param {string} breaktype Break type: startcol|startrow|none
     */
    setLayoutType(type: string, breaktype?: string): NLObjField;
    /**
     * Set the text that gets displayed in lieu of the field value for URL fields.
     *
     * @param {string} text user-friendly display value in lieu of URL
     */
    setLinkText(text: string): NLObjField;
    /**
     * Make this field mandatory. This method is only supported on scripted fields via the UI Object API
     *
     * @param {boolean} mandatory if true then field becomes mandatory
     */
    setMandatory(mandatory: boolean): NLObjField;
    /**
     * Set the maxlength for this field (only valid for certain field types). This method is only supported on scripted fields via the UI Object API.
     *
     * @param {number} maxLength maximum length for this field
     */
    setMaxLength(maxLength: number): NLObjField;
    /**
     * Set the amount of empty vertical space (rows) between this field and the previous field. This method is only supported on scripted fields via the UI Object API.
     *
     * @param {number} padding # of empty rows to display above field
     */
    setPadding(padding: number): NLObjField;
}

interface NLObjFieldGroup {
    /**
     * Set collapsibility property for this field group.
     *
     * @param {boolean} collapsible if true then this field group is collapsible
     * @param {boolean} defaultcollapsed if true and the field group is collapsible, collapse this field group by default
     */
    setCollapsible(collapsible: boolean, defaultcollapsed?: boolean): NLObjFieldGroup;
    /**
     * Set the label for this field group.
     * @param {string} label display label for field group
     */
    setLabel(label: string): NLObjFieldGroup;
    /**
     * Set showBorder property for this field group.
     *
     * @param {boolean} showBorder If true then this field group shows border including label of group.
     */
    setShowBorder(showBorder: boolean): NLObjFieldGroup;
    /**
     * Set singleColumn property for this field group.
     *
     * @param {boolean} singleColumn if true then this field group is displayed in single column
     */
    setSingleColumn(singleColumn: boolean): NLObjFieldGroup;
}

interface NLObjFile {
    /**
     * Return the file description.
     */
    getDescription(): string;
    /**
     * Return the internal ID of the folder that this file is in.
     */
    getFolder(): number;
    /**
     * Return the id of the file (if stored in the FC).
     */
    getId(): number;
	/**
     * Return the name of the file.
     */
    getName(): string;
    /**
     * Return the size of the file in bytes.
     */
    getSize(): number;
    /**
     * Return the type of the file.
     */
    getType(): string;
    /**
     * Return the URL of the file (if stored in the FC).
     */
    getURL(): string;
    /**
     * Return the value (base64 encoded for binary types) of the file.
     */
    getValue(): string;
    /**
     * Return true if the file is inactive.
     */
    isInactive(): boolean;
    /**
     * Return true if the file is "Available without Login".
     */
    isOnline(): boolean;
    /**
     * Sets the file's description.
     * @param {string} description the file description
     */
    setDescription(description: string): void;
    /**
     * Sets the character encoding for the file.
     * @param {string} encoding
     */
    setEncoding(encoding: string): void;
    /**
     * Sets the internal ID of the folder that this file is in.
     * @param {number} folder
     */
    setFolder(folder: number): void;
    /**
     * Sets the file's inactive status.
     * @param {boolean} inactive
     */
    setIsInactive(inactive: boolean): void;
    /**
     * Sets the file's "Available without Login" status.
     * @param {boolean} online
     */
    setIsOnline(online: boolean): void;
    /**
     * Sets the name of a file.
     * @param {string} name the name of the file.
     */
    setName(name: string): void;

}

interface NLObjForm {
    /**
     * Add a button to this form.
     *
     * @param {string} name button name
     * @param {string} label button label
     * @param {string} script button script (function name)
     */
    addButton(name: string, label: string, script: string): NLObjButton;
    /**
     * Adds a field that lets you store credentials in NetSuite to be used when invoking services provided by third parties.
     *
     * @param {string} id The internal ID of the credential field.
     * @param {string} label The UI label for the credential field.
     * @param {string} website The domain the credentials can be sent to.
     * @param {string} scriptId The scriptId of the script that is allowed to use this credential field.
     * @param {string} value If you choose, you can set an initial value for this field. This value is the handle to the credentials.
     * @param {boolean} entityMatch Controls whether use of nlapiRequestUrlWithCredentials with this credential is restricted to the same entity that originally entered the credential.
     * @param {string} tab The tab parameter can be used to specify either a tab or a field group (if you have added nlobjFieldGroup objects to your form).
     */
    addCredentialField(id: string, label: string, website?: string, scriptId?: string, value?: string, entityMatch?: boolean, tab?: string): NLObjField;
    /**
     * Add a field (nlobjField) to this form and return it.
     *
     * @param {string} name field name
     * @param {string} type field type
     * @param {string} label field label
     * @param {string|number} sourceOrRadio Script ID or internal ID for source list (select and multiselects only) -or- radio value for radio fields
     * @param {string} tab Tab name that this field will live on. If empty then the field is added to the main section of the form (immediately below the title bar).
     */
    addField(name: string, type: string, label: string, sourceOrRadio?: string|number, tab?: string): NLObjField;
    /**
     * Add a field group to the form.
     * @param {string} name field group name
     * @param {string} label field group label
     * @param {string} tab
     */
    addFieldGroup(name: string, label: string, tab?: string): NLObjFieldGroup;
    /**
     * Add a navigation cross-link to the page.
     *
     * @param {string} type	page link type: crosslink|breadcrumb
     * @param {string} title page link title
     * @param {string} url URL for page link
     */
    addPageLink(type: string, title: string, url: string): void;
    /**
     * Add a reset button to this form.
     *
     * @param {string} label Label for this button. defaults to "Reset".
     */
    addResetButton(label?: string): NLObjButton;
    /**
     * Add a sublist (nlobjSubList) to this form and return it.
     *
     * @param {string} name sublist name
     * @param {string} type sublist type: inlineeditor|editor|list|staticlist
     * @param {string} label sublist label
     * @param {string} tab parent tab that this sublist lives on. If empty, it is added to the main tab
     */
    addSubList(name: string, type: string, label: string, tab?: string): NLObjSubList;
    /**
     * Add a submit button to this form.
     *
     * @param {string} label Label for this submit button. Defaults to "Save".
     */
    addSubmitButton(label?: string): NLObjButton;
    /**
     * Add a subtab (nlobjTab) to this form and return it.
     *
     * @param {string} name subtab name
     * @param {string} label subtab label
     * @param {string} tab parent tab that this subtab lives on. If empty, it is added to the main tab.
     */
    addSubTab(name: string, label: string, tab?: string): NLObjTab;
    /**
     * Add a tab (nlobjTab) to this form and return it.
     *
     * @param {string} name tab name
     * @param {string} label tab label
     */
    addTab(name: string, label: string): NLObjTab;
    /**
     * Get a button from this form by name.
     * @param {string} name Button Id.
     */
    getButton(name: string): NLObjButton;
    /**
     * Return a field (nlobjField) on this form.
     *
     * @param {string} name field name
     * @param {string} radio If this is a radio field, specify which radio field to return based on radio value.
     */
    getField(name: string, radio?: string): NLObjField;
    /**
     * Return a sublist (nlobjSubList) on this form.
     *
     * @param {string} name sublist name
     */
    getSubList(name: string): NLObjSubList;
    /**
     * Return a subtab (nlobjTab) on this form.
     *
     * @param {string} name subtab name
     */
    getSubTab(name: string): NLObjTab;
    /**
     * Return a tab (nlobjTab) on this form.
     *
     * @param {string} name Tab name.
     */
    getTab(name: string): NLObjTab;
    /**
     * Get a list of all tabs.
     */
    getTabs(): string[];
    /**
     * Insert a field (nlobjField) before another field (name).
     *
     * @param {NLObjField} field The field object to insert.
     * @param {string} nextfld The name of the field before which to insert this field.
     */
    insertField(field: NLObjField, nextfld: string): NLObjField;
    /**
     * Insert a sublist (nlobjSubList) before another subtab or sublist (name).
     *
     * @param {NLObjSubList} sublist The sublist object to insert.
     * @param {string} nextsublist The name of the sublist before which to insert this sublist.
     */
    insertSubList(sublist: NLObjSubList, nextsublist: string): NLObjSubList;
    /**
     * Insert a subtab (nlobjTab) before another subtab or sublist (name).
     *
     * @param {NLObjTab} subtab The subtab object to insert.
     * @param {string} nextsubtab The name of the subtab before which to insert this subtab.
     */
    insertSubTab(subtab: NLObjTab, nextsubtab: string): NLObjTab;
    /**
     * Insert a tab (nlobjTab) before another tab (name).
     *
     * @param {NLObjTab} tab the tab object to insert
     * @param {string} nexttab the name of the tab before which to insert this tab
     */
    insertTab(tab: NLObjTab, nexttab: string): NLObjTab;
    /**
     * Removes an nlobjButton object. This method can be used on custom buttons and certain built-in NetSuite buttons.
     * @param {string} name
     */
    removeButton(name: string): void;
    /**
     * Set the values for all the fields on this form.
     *
     * @param {Object} values Object containing field name/value pairs
     */
    setFieldValues(values: Object): void;
    /**
     * Set the Client Script definition used for this page.
     *
     * @param {string|number} script Script ID or internal ID for global client script used to enable Client SuiteScript on page
     */
    setScript(script: string|number): void;
    /**
     * Set the page title.
     *
     * @param {string} title
     */
    setTitle(title: string): void;
}

interface NLObjFuture {
    cancel(): boolean;
    getId(): string;
    isCancelled(): boolean;
    isDone(): boolean;
}

interface NLObjJobManager {
    createJobRequest(): NLObjJobRequest;
    getFuture(): NLObjFuture;
    submit(request: NLObjJobRequest): string;
}

interface NLObjJobRequest {

}

interface NLObjList {
    /**
     * Add a column (nlobjColumn) to this list and return it.
     *
     * @param {string} name column name
     * @param {string} type column type
     * @param {string} label column label
     * @param {string} align column alignment
     */
    addColumn(name: string, type: string, label: string, align?: string): NLObjColumn;
    /**
     * Add an Edit column (nlobjColumn) to the left of the column specified.
     *
     * @param {NLObjColumn} column
     * @param {boolean} showView should Edit|View instead of Edit link
     * @param {string} showHref column that evaluates to T or F that determines whether to disable the edit|view link per-row.
     */
    addEditColumn(column: NLObjColumn, showView: boolean, showHref?: string): NLObjColumn;
    /**
     * Add a navigation cross-link to the page.
     *
     * @param {string} type	page link type: crosslink|breadcrumb
     * @param {string} title page link title
     * @param {string} url URL for page link
     */
    addPageLink(type: string, title: string, url: string): void;
    /**
     * Add a row (Array of name-value pairs or nlobjSearchResult) to this portlet.
     *
     * @param {string[]|NLObjSearchResult} row data used to add a single row
     */
    addRow(row: string[]|NLObjSearchResult): void;
    /**
     * Add multiple rows (Array of nlobjSearchResults or name-value pair Arrays) to this portlet.
     *
     * @param {string[][]|NLObjSearchResult[]} rows data used to add multiple rows
     */
    addRows(rows: string[][]|NLObjSearchResult[]): void;
    /**
     * Set the Client SuiteScript used for this page.
     *
     * @param {string|number} script script ID or internal ID for global client script used to enable Client SuiteScript on page
     */
    setScript(script: string|number): void;
    /**
     * Set the global style for this list: grid|report|plain|normal.
     *
     * @param {string} style overall style used to render list
     */
    setStyle(style: string): void;
    /**
     * Set the page title.
     *
     * @param {string} title
     */
    setTitle(title: string): void;
}

interface NLObjLogin {
    /**
     * @param {string} currentPassword
     * @param {string} newEmail new Email
     * @param {boolean} justThisAccount indicates whether to apply email change only to roles within this account or apply email change to its all NetSuite accounts and roles
     */
    changeEmail(currentPassword: string, newEmail: string, justThisAccount: boolean): void;
    /**
     * @param {string} currentPassword
     * @param {string} newPassword New Password.
     */
    changePassword(currentPassword: string, newPassword: string): void;
}

interface NLObjMergeResult {
    /**
     * Use this method to get the body of the email distribution in string format.
     */
    getBody(): string;

    /**
     * Use this method to get the subject of the email distribution in string format.
     */
    getSubject(): string;
}

interface NLObjPivotColumn {
    /**
     * Get the column alias.
     */
    getAlias(): string;
    /**
     * Get the column hierarchy.
     */
    getColumnHierarchy(): NLObjPivotColumn;
    /**
     * Get dependency for specified alias.
     */
    getDependency(alias: string): Object;
    /**
     * Get the column label.
     */
    getLabel(): string;
    /**
     * Get the summary line.
     */
    getSummaryLine(): NLObjPivotColumn;
}

interface NLObjPivotRow {
    /**
     * Get the row alias.
     */
    getAlias(): string;
    /**
     * Get the children rows if there are any.
     */
    getChildren(): NLObjPivotRow[];
    /**
     * Get the opening line.
     */
    getOpeningLine(): NLObjPivotRow;
    /**
     * Get the parent row.
     */
    getParent(): NLObjPivotRow;
    /**
     * Get the summary line from the report.
     */
    getSummaryLine(): NLObjPivotRow;
}

interface NLObjPivotTable {
    /**
     * Get the parent column.
     */
    getParent(): NLObjPivotColumn;
    /**
     * Get the row hierarchy.
     */
    getRowHierarchy(): NLObjPivotRow;
}

interface NLObjPivotTableHandle {
    /**
     * Get the pivot table object from the report definition.
     */
    getPivotTable(): NLObjPivotTable;
    /**
     * Returns the completion status flag of the report definition execution.
     */
    isReady(): boolean;
}

interface NLObjPortlet {
    /**
     * Add a column (nlobjColumn) to this LIST portlet and return it.
     *
     * @param {string} name	column name
     * @param {string} type column type
     * @param {string} label column label
     * @param {string} align column alignment
     */
    addColumn(name: string, type: string, label: string, align?: string): NLObjColumn;
    /**
     * Add an Edit column (nlobjColumn) to the left of the column specified (supported on LIST portlets only).
     *
     * @param {NLObjColumn} column
     * @param {boolean} showView should Edit|View instead of Edit link
     * @param {string} showHref column that evaluates to T or F that determines whether to disable the edit|view link per-row.
     */
    addEditColumn(column: NLObjColumn, showView: boolean, showHref?: string): NLObjColumn;
    /**
     * add a field (nlobjField) to this FORM portlet and return it.
     *
     * @param {string} name field name
     * @param {string} type field type
     * @param {string} label field label
     * @param {string|number} source Script ID or internal ID for source list (select and multiselects only) -or- radio value for radio fields
     */
    addField(name: string, type: string, label?: string, source?: string|number): NLObjField;
    /**
     * Add a line (containing text or simple HTML) with optional indenting and URL to this LINKS portlet.
     *
     * @param {string} text data to output to line
     * @param {string} url URL if this line should be clickable (if NULL then line will not be clickable)
     * @param {number} indent Number of indents to insert before text
     */
    addLine(text: string, url?: string, indent?: number): void;
    /**
     * Add a row (nlobjSearchResult or Array of name-value pairs) to this LIST portlet.
     *
     * @param {string[]|NLObjSearchResult} row
     */
    addRow(row: string[]|NLObjSearchResult): void;
    /**
     * Add multiple rows (Array of nlobjSearchResults or name-value pair Arrays) to this LIST portlet.
     *
     * @param {string[][]|NLObjSearchResult[]} rows
     */
    addRows(rows: string[][]|NLObjSearchResult[]): void;
    /**
     * Set the entire contents of the HTML portlet (will be placed inside a <TD>...</TD>).
     *
     * @param {string} html
     */
    setHtml(html: string): void;
    /**
     * Sets the regular interval when a FORM portlet automatically refreshes itself.
     *
     * @restriction This API is only available if the portlet type is FORM.
     *
     * @param {number} n Number of seconds. In production mode, this value must be at least 60 seconds. An error is raised if this value is less than zero, and in production if it is less than 60.
     */
    setRefreshInterval(n: number): void;
    /**
     * Sets the client-side script for a FORM portlet. Setting another script implicitly removes the previous script.
     *
     * @param {number|string} scriptId The script internalId or custom scriptId of a record-level client script.
     */
    setScript(scriptId: number|string): void;
    /**
     * Add a FORM submit button to this FORM portlet.
     *
     * @param {string} url URL that this form portlet will POST to
     * @param {string} label label for submit button (defaults to Save)
     * @param {string} target The target attribute of the portlet's FORM element
     */
    setSubmitButton(url: string, label?: string, target?: string): void;
    /**
     * Set the portlet title.
     *
     * @param {string} title
     */
    setTitle(title: string): void;
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
     * Returns a nlobjSubrecord object. Use this API to create a subrecord from a body field on the parent record.
     *
     * @param {string} fldname The internal ID of the 'subrecord field' on the body of the parent record.
     */
    createSubrecord(fldname: string): NLObjSubrecord;
    /**
     * Returns a nlobjSubrecord object. Use this API to edit a subrecord from a sublist field on the parent record.
     *
     * @param {string} sublist The sublist internal ID on the parent record
     * @param {string} fldname The internal ID of the 'subrecord field' on the sublist of the parent record
     */
    editCurrentLineItemSubrecord(sublist: string, fldname: string): NLObjSubrecord;
    /**
     * Returns a nlobjSubrecord object. Use this API to edit a subrecord from a body field on the parent record.
     *
     * @param {string} fldname The internal ID of the 'subrecord field' on the body of the parent record.
     */
    editSubrecord(fldname: string): NLObjSubrecord;
    /**
     * Return line number for 1st occurrence of field value in a sublist column.
     *
     * @param {string} 	group	sublist name
     * @param {string} 	fldnam	sublist field name
     * @param {number} 	column  matrix column index (1-based)
     * @param {string} 	value 	matrix field value
     */
    findLineItemMatrixValue(group: string, fldnam: string, column: number, value: string): number;
    /**
     * Return line number for 1st occurrence of field value in a sublist column.
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
     * Return the current text of a sublist field. This isn't documented, but it works as of 2017.2.
     *
     * @param {string} group sublist name
     * @param {string} name sublist field name
     */
    getCurrentLineItemText(group: string, name: string): string;
    /**
     * Return the current value of a sublist field.
     *
     * @param {string} 	group sublist name
     * @param {string} 	name sublist field name
     */
    getCurrentLineItemValue(group: string, name: string): string;
    /**
     * Returns the values of a multiselect sublist field on the currently selected line. One example of a multiselect sublist field is the Serial Numbers field on the Items sublist.
     * @restriction This function is not supported in client SuiteScript. It is meant to be used in user event scripts.
     *
     * @param {string} type The sublist internal ID
     * @param {string} fldname The name of the multiselect field
     */
    getCurrentLineItemValues(type: string, fldname: string): string[];
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
    getLineItemCount(group: string): number | string;
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
     * Use this API to get the value of a matrix field that appears on a specific line in a specific column. This API can be used only in the context of a matrix sublist.
     *
     * @param {string} group The sublist internal ID
     * @param {string} fldnam The internal ID of the matrix field whose value you want returned
     * @param {number} linenum The line number for this field. Note the first line number on a sublist is 1 (not 0).
     * @param {number} column The column number for this field. Column numbers start at 1 (not 0).
     */
    getLineItemMatrixValue(group: string, fldnam: string, linenum: number, column: number): string;
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
     * Returns the values of a multiselect sublist field on a selected line. One example of a multiselect sublist field is the Serial Numbers field on the Items sublist.
     * @restriction This function is not supported in client SuiteScript. It is meant to be used in user event scripts.
     *
     * @param {string} type The sublist internal ID
     * @param {string} fldnam The internal ID of the multiselect field
     * @param {number} linenum The line number for this field. Note the first line number on a sublist is 1 (not 0).
     */
    getLineItemValues(type: string, fldnam: string, linenum: number): string[];
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
     * Returns a nlobjSubrecord object. Use this API to remove a subrecord from a sublist field on the parent record.
     *
     * @param {string} sublist The sublist internal ID on the parent record.
     * @param {string} fldname The internal ID of the 'subrecord field' on the sublist of the parent record.
     */
    removeCurrentLineItemSubrecord(sublist: string, fldname: string): void;
    /**
     * Remove an existing line from a sublist.
     *
     * @param {string} group Sublist name.
     * @param {number} line Line number to remove.
     */
    removeLineItem(group: string, line?: number): void;
    /**
     * Returns a nlobjSubrecord object. Use this API to remove a subrecord from a body field on the parent record.
     *
     * @param {string} fldname The internal ID of the 'subrecord field' on the body of the parent record.
     */
    removeSubrecord(fldname: string): NLObjRecord;
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
     * @param {string} group sublist name
     * @param {string} name sublist field name
     * @param {string} value sublist field value
     * @param {string} timezone
     */
    setCurrentLineItemDateTimeValue(group: string, name: string, value: string, timezone?: string): void;
    /**
     * Set the current value of a sublist matrix field.
     *
     * @param {string} group matrix sublist name
     * @param {string} name matrix field name
     * @param {number} column matrix field column index (1-based)
     * @param {string} value matrix field value
     */
    setCurrentLineItemMatrixValue(group: string, name: string, column: number, value: string): void;
    /**
     * Set the current text of a sublist field.
     * @param {string} group sublist name
     * @param {string} name sublist field name
     * @param {string|number} value sublist field value
     */
    setCurrentLineItemText(group: string, name: string, value: string|number): void;
    /**
     * Set the current value of a sublist field.
     * @param {string} group sublist name
     * @param {string} name sublist field name
     * @param {string|number} value sublist field value
     */
    setCurrentLineItemValue(group: string, name: string, value: string|number): void;
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
     * @param {string|number} value Field value
     */
    setFieldValue(name: string, value: string|number): void;
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
     * @param {number|string} line line number (1-based)
     * @param {string|number} value sublist field value
     */
    setLineItemValue(group: string, name: string, line: number|string, value: string|number): void;
    /**
     * Set the value of a matrix header field.
     *
     * @param {string} type matrix sublist name
     * @param {string} name	matrix field name
     * @param {number} column matrix column index (1-based)
     * @param {string} value field value
     */
    setMatrixValue(type: string, name: string, column: number, value: string): void;
    /**
     * Returns a nlobjSubrecord object. Use this API to view a subrecord from a sublist field on the parent record.
     *
     * @param {string} sublist The sublist internal ID on the parent record.
     * @param {string} fldname The internal ID of the 'subrecord field' on the sublist of the parent record.
     */
    viewCurrentLineItemSubrecord(sublist: string, fldname: string): NLObjSubrecord;
    /**
     * Returns a nlobjSubrecord object. Use this API to view a subrecord from a sublist field on the parent record.
     *
     * @param {string} sublist The sublist internal ID on the parent record
     * @param {string} fldname The internal ID of the 'subrecord field' on the sublist of the parent record
     * @param {number} linenum The line number for the sublist field. Note the first line number on a sublist is 1 (not 0).
     */
    viewLineItemSubrecord(sublist: string, fldname: string, linenum: number): NLObjSubrecord;
    /**
     * Returns a nlobjSubrecord object. Use this API to view a subrecord from a body field on the parent record.
     *
     * @param {string} fldname The internal ID of the 'subrecord field' on the body of the parent record.
     */
    viewSubrecord(fldname: string): NLObjSubrecord;
}

interface NLObjReportColumn {
    /**
     * Get the formula for this column.
     */
    getFormula(): string;
    /**
     * Get the parent reference of this column.
     */
    getParent(): NLObjReportColumnHierarchy;
    /**
     * Returns the measure flag.
     */
    isMeasure(): boolean;
}

interface NLObjReportColumnHierarchy {
    /**
    * Get the children reference of this column hierarchy.
    */
    getChildren(): NLObjReportColumnHierarchy;
    /**
     * Get the parent reference of this column hierarchy.
     */
    getParent(): NLObjReportColumnHierarchy;
}

interface NLObjReportDefinition {
    /**
    * Add a column to the report definition.
    * @param {string} alias The column alias.
    * @param {boolean} isMeasure A value of true means that the column is flagged as a measure.
    * @param {string} label The column label that will be displayed on the report.
    * @param {NLObjReportColumnHierarchy} parent The reference to the parent column in the hierarchy. If null, then this column will not be associated with a parent column.
    * @param {string} format The data type that this column represents
    * @param {string} formula A string which describes a mathematical formula in the format of 'F(x,y,z) = mathematical function', where x,y,z are previously defined aliases from addRowHierarchy, addColumnHierarchy, or addColumn calls.
    */
    addColumn(alias: string, isMeasure: boolean, label: string, parent?: NLObjReportColumnHierarchy, format?: string, formula?: string): NLObjReportColumn;
    /**
    * Add a column hierarchy to the report definition.
    *
    * @param {string} alias The column alias.
    * @param {string} label The column label that will be displayed on the report.
    * @param {NLObjReportColumnHierarchy}  parent The reference of the parent column in the hierarchy. If null, then this column will be the root (top level) column.
    * @param {string} format The data type that this column represents
    *
    * return {nlobjReportColumnHierarchy}
    *
    * @since 2012.2
    */
    addColumnHierarchy(alias: string, label: string, parent?: NLObjReportColumnHierarchy, format?: string): NLObjReportColumnHierarchy;
    /**
    * Add a row hierarchy to the report definition.
    *
    * @param {string} alias The row alias.
    * @param {string} label The row label that will be displayed on the report.
    * @param {string} format The data type that this row represents.
    */
    addRowHierarchy(alias: string, label: string, format: string): NLObjReportRowHierarchy;
    /**
    * Attaches a search as a data source to the report definition.
    *
    * @param {string} searchType The type of records to search.
    * @param {string} id The internal id if you are using a saved search as a data source.
    * @param {NLObjSearchFilter[]} filters The array of search filters.
    * @param {NLObjSearchColumn[]} columns The array of search columns.
    * @param {string} map The mapping of rows/columns of the search to the report.
    */
    addSearchDatasource(searchType: string, id?: string, filters?: NLObjSearchFilter[], columns?: NLObjSearchColumn[], map?: string): void;
    /**
    * Creates the form for rendering from the report definition.
    *
    * @param {NLObjReportForm} form The form object created with nlapiCreateReportForm.
    */
    executeReport(form: NLObjReportForm): NLObjPivotTableHandle;
    /**
    * Sets the title of the report definition.
    *
    * @param {string} title The name of the report definition.
    */
    setTitle(title?: string): NLObjPivotTableHandle;
}

interface NLObjReportRowHierarchy {
    /**
    * Get the children reference of this column hierarchy.
    */
    getChildren(): NLObjReportRowHierarchy;
    /**
     * Get the parent reference of this column hierarchy.
     */
    getParent(): NLObjReportRowHierarchy;
}

interface NLObjReportForm { }

interface NLObjRequest {
    /**
     * Return an Object containing field names to file objects for all uploaded files.
     */
    getAllFiles(): Object;
    /**
     * Return an Object containing all the request headers and their values.
     */
    getAllHeaders(): Object;
    /**
     * Return an Object containing all the request parameters and their values.
     */
    getAllParameters(): Object;
    /**
     * Return the body of the POST request.
     */
    getBody(): string;
    /**
     * Return the value of an uploaded file.
     * @param {string} id file field name
     */
    getFile(id: string): NLObjFile;
    /**
     * Return the value of a request header.
     * @param {string} name
     */
    getHeader(name: string): string;
    /**
     * Return the number of lines in a sublist.
     * @param {string} group sublist name
     */
    getLineItemCount(group: string): number;
    /**
     * Return the value of a sublist value.
     * @param {string} 	group sublist name
     * @param {string} 	name  sublist field name
     * @param {number} 	line  sublist line number
     */
    getLineItemValue(group: string, name: string, line: number): string;
    /**
     * Return the METHOD of the request
     */
    getMethod(): string;
    /**
     * Return the value of a request parameter.
     *
     * @param {string} name parameter name
     */
    getParameter(name: string): string;
    /**
     * Return the values of a request parameter as an Array.
     *
     * @param {string} name parameter name
     */
    getParameterValues(name: string): string[];
    /**
     * Return the URL of the request
     */
    getURL(): string;
}

/** Accessor to Http response made available to Suitelets. */
interface NLObjResponse {
    /**
     * Add a value for a response header.
     * @param  {string} name of header
     * @param  {string} value for header
     */
    addHeader(name: string, value: string): void;
    /**
     * Return an Array (Object?) of all response headers.
     * @return  {Object}
     */
    getAllHeaders(): Object;
    /**
     * Returns the body returned by the server. Only available in the return value of a call to nlapiRequestURL(url, postdata, headers, callback, httpMethod).
     */
    getBody(): string;
    /**
     * Returns the response code returned by the server. Only available in the return value of a call to nlapiRequestURL(url, postdata, headers, callback, httpMethod).
     */
    getCode(): string;
    /**
     * Returns the nlobjError thrown during request. Only available in the return value of call to nlapiRequestURL in Client SuiteScript.
     */
    getError(): NLObjError;
    /**
     * Return the value of a response header.
     * @param  {string} name of header
     */
    getHeader(name: string): string;
    /**
     * Return an Array of all response header values for a header
     * @param  {string} name of header
     */
    getHeaders(name: string): string[];
    /**
     * Generates, and renders, a PDF directly to a response. Use renderPDF to generate PDFs without first importing a file to the file cabinet. This method is useful if your script does not have NetSuite file cabinet permissions.
     * @param {string} xmlString Content of your PDF, passed to renderPDF as a string.
     */
    renderPDF(xmlString: string): void;
    /**
     * Sets the redirect URL for the response. All URLs must be internal unless the Suitelet is being executed in an "Available without Login" context
     * at which point it can use type "external" to specify an external url via the subtype arg.
     *
     * @param {string} type type specifier for URL: suitelet|tasklink|record|mediaitem|external
     * @param {string} subtype subtype specifier for URL (corresponding to type): scriptid|taskid|recordtype|mediaid|url
     * @param {string} id internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a
     * @param {string} pageMode string specifier used to configure page (suitelet: external|internal, tasklink|record: edit|view)
     * @param {Object} parameters Object used to specify additional URL parameters as name/value pairs
     */
    sendRedirect(type: string, subtype: string, id?: string, pageMode?: boolean, parameters?: Object): void;
    /**
     * Sets the content type for the response (and an optional filename for binary output).
     *
     * @param {string} type the file type i.e. plainText, word, pdf, html doc (see list of media item types)
     * @param {string} filename the file name
     * @param {string} disposition Content Disposition used for streaming attachments: inline|attachment
     */
    setContentType(type: string, filename?: string, disposition?: string): void;
    /**
     * Sets the character encoding for the response.
     * @param {String} encoding
     */
    setEncoding(encoding: string): void;
    /**
     * Set the value of a response header.
     * @param  {string} name of header
     * @param  {string} value for header
     */
    setHeader(name: string, value: string): void;
    /**
     * Sets CDN caching for a shorter period of time or a longer period of time.
     * @param {string} type Constant value to represent the caching duration: CACHE_DURATION_UNIQUE, CACHE_DURATION_SHORT, CACHE_DURATION_MEDIUM, CACHE_DURATION_LONG
     */
    setCDNCacheable(type: string): void;
    /**
     * Write information (text/xml/html) to the response.
     *
     * @param {string} output
     */
    write(output: string): void;
    /**
     * Write line information (text/xml/html) to the response.
     *
     * @param {string} output
     */
    writeLine(output: string): void;
    /**
     * Write a UI object page.
     *
     * @param {Object} pageobject Page UI object: nlobjList|nlobjAssistant|nlobjForm|nlobjDashboard
     */
    writePage(pageobject: Object): void;
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
     * @param {(string|string[])[]} filterExpression The filter expression you want to set in the search. Passing in null or [] removes all filters from the search.
     */
    setFilterExpression(filterExpression: (string|string[])[]): void;
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

/**
 * Return a new instance of nlobjSearchColumn used for column objects used to define search return columns.
 *
 * @classDescription search column.
 * @constructor
 * @param {string} name column name.
 * @param {string} join internal ID for joined search where this column is defined
 * @param {string} summary
 */
declare function nlobjSearchColumn(name: string, join?: string, summary?: string): void;
interface NLObjSearchColumn {
    /**
     * Return formula for this search column.
     */
    getFormula(): string;
    /**
     * The function used in this search column as a string.
     */
    getFunction(): string;
    /**
     * Return the join id for this search column.
     */
    getJoin(): string;
    /**
     * Return the label of this search column.
     */
    getLabel(): string;
    /**
     * Return the name of this search column.
     */
    getName(): string;
    /**
     * Returns the sort direction for this column.
     */
    getSort(): string;
    /**
     * Return the summary type (avg,group,sum,count) of this search column.
     */
    getSummary(): string;
    /**
     * Set the formula used for this column. Name of the column can either be formulatext, formulanumeric, formuladatetime, formulapercent, or formulacurrency.
     *
     * @param {string} formula The formula used for this column.
     */
    setFormula(formula: string): NLObjSearchColumn;
    /**
     * Sets the special function used for this column.
     *
     * @param {string} functionId Special function used for this column.
     */
    setFunction(functionId: string): NLObjSearchColumn;
    /**
     * Set the label used for this column.
     *
     * @param {string} label The label used for this column.
     */
    setLabel(label: string): NLObjSearchColumn;
    /**
     * Return nlobjSearchColumn sorted in either ascending or descending order.
     *
     * @param {boolean} sort If not set, defaults to false, which returns column data in ascending order.
     */
    setSort(sort: boolean): NLObjSearchColumn;
    /**
     * Returns the search column for which the minimal or maximal value should be found when returning the nlobjSearchColumn value.
     *
     * @param {string} name The name of the search column for which the minimal or maximal value should be found.
     * @param {string} join The join id for this search column.
     */
    setWhenOrderBy(name: string, join: string): NLObjSearchColumn;
}

/**
 * Return a new instance of nlobjSearchFilter filter objects used to define search criteria.
 *
 * @classDescription search filter
 * @constructor
 * @param {string} name Filter name.
 * @param {string} join Internal ID for joined search where this filter is defined
 * @param {string} operator Operator name (i.e. anyOf, contains, lessThan, etc..)
 * @param {string|string[]} value
 * @param {string} value2
 */
declare function nlobjSearchFilter(name: string, join: string, operator: string, value?: string|string[], value2?: string): void;
interface NLObjSearchFilter {
    /**
     * Returns the formula used for this filter.
     */
    getFormula(): string;
    /**
     * Return the join id for this search filter.
     */
    getJoin(): string;
    /**
     * Return the name of this search filter.
     */
    getName(): string;
    /**
     * Return the filter operator used.
     */
    getOperator(): string;
    /**
     * Returns the summary type used for this filter.
     */
    getSummaryType(): string;
    /**
     * Sets the formula used for this filter. Name of the filter can either be formulatext, formulanumeric, formuladatetime, formulapercent, or formulacurrency.
     *
     * @param {string} formula The formula used for this filter.
     */
    setFormula(formula: string): NLObjSearchFilter;
    /**
     * Sets the summary type used for this filter. Filter name must correspond to a search column if it is to be used as a summary filter.
     *
     * @param {string} type The summary type used for this filter.
     */
    setSummaryType(type: string): NLObjSearchFilter;
}

interface NLObjSearchResult {
    /**
     * Return an array of all nlobjSearchColumn objects returned in this search.
     */
    getAllColumns(): NLObjSearchColumn[];
    /**
     * Return the internalId for the record returned in this row.
     */
    getId(): number;
    /**
     * Return the recordtype for the record returned in this row.
     */
    getRecordType(): string;
    /**
     * Return the value for this nlobjSearchColumn.
     * @param {nlobjSearchColumn} column Search result column.
     */
    getValue(column: NLObjSearchColumn): string;
    /**
     * Return the value for a return column specified by name, join ID, and summary type.
     * @param {string} name the name of the search column.
     * @param {string} join the join ID for the search column.
     * @param {string} summary summary type specified for this column.
     */
    getValue(name: string, join?: string, summary?: string): string;
    /**
     * Return the text value for this nlobjSearchColumn.
     * @param {nlobjSearchColumn} column Search result column.
     */
    getText(column: NLObjSearchColumn): string;
    /**
     * Return the text value for a return column specified by name, join ID, and summary type.
     * @param {string} name the name of the search column.
     * @param {string} join the join ID for the search column.
     * @param {string} summary summary type specified for this column.
     */
    getText(name: string, join?: string, summary?: string): string;
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
    /**
     * Return internal ID for select option
     */
    getId(): string;
    /**
     * Return display value for select option.
     */
    getText(): string;
}

/** Contains the results of a server response to an outbound Http(s) call. */
interface NLObjServerResponse {
    /**
     * Return an Array of all headers returned.
     */
    getAllHeaders(): string[];
    /**
     * Return the response body returned.
     */
    getBody(): string;
    /**
     * Return the response code returned.
     */
    getCode(): number;
    /**
     * Return the Content-Type header in response.
     */
    getContentType(): string;
    /**
     * Return the nlobjError thrown via a client call to nlapiRequestURL.
     */
    getError(): NLObjError;
    /**
     * Return the value of a header returned.
     * @param {string} name the name of the header to return
     */
    getHeader(name: string): string;
    /**
     * Return all the values of a header returned.
     * @param {string} name the name of the header to return
     */
    getHeaders(name: string): string[];
}

interface NLObjSubList {
    /**
     * Add a button to this sublist.
     *
     * @param {string} name button name
     * @param {string} label button label
     * @param {string} script button script (function name)
     */
    addButton(name: string, label: string, script: string): NLObjButton;
    /**
     * Add a field (column) to this sublist.
     *
     * @param {string} name Field name
     * @param {string} type Field type
     * @param {string} label Field label
     * @param {string|number} source Script ID or internal ID for source list used for this select field
     */
    addField(name: string, type: string, label: string, source?: string|number): NLObjField;
    /**
     * Add "Mark All" and "Unmark All" buttons to this sublist of type "list".
     */
    addMarkAllButtons(): void;
    /**
     * Add "Refresh" button to sublists of type "staticlist" to support manual refreshing of the sublist (without entire page reloads) if it's contents are very volatile
     */
    addRefreshButton(): NLObjButton;
    /**
     * Return the number of lines in a sublist.
     *
     * @param {string} group sublist name
     */
    getLineItemCount(group: string): number;
    /**
     * Returns string value of a sublist field. Note that you cannot set default line item values when the line is not in edit mode.
     *
     * @param {string} group The sublist internal id
     * @param {string} fldnam The internal ID of the field (line item) whose value is being returned
     * @param {number} linenum The line number for this field. Note the first line number on a sublist is 1 (not 0).
     */
    getLineItemValue(group: string, fldnam: string, linenum: number): string;
    /**
     * Designates a particular column as the totalling column, which is used to calculate and display a running total for the sublist
     *
     * @param {string} field The internal ID name of the field on this sublist used to calculate running total
     */
    setAmountField(field: string): void;
    /**
     * Set the display type for this sublist: hidden|normal. This method is only supported on scripted or staticlist sublists via the UI Object API.
     *
     * @param {string} type
     */
    setDisplayType(type: string): void;
    /**
     * Set helper text for this sublist. This method is only supported on sublists via the UI Object API.
     *
     * @param {string} help
     */
    setHelpText(help: string): void;
    /**
     * Set the label for this sublist. This method is only supported on sublists via the UI Object API.
     *
     * @param {string} label
     */
    setLabel(label: string): void;
    /**
     * Set the value of a cell in this sublist.
     *
     * @param {string} 	field sublist field name
     * @param {number} 	line  line number (1-based)
     * @param {string} 	value sublist value
     */
    setLineItemValue(field: string, line: number, value: string): void;
    /**
     * Set values for multiple lines (Array of nlobjSearchResults or name-value pair Arrays) in this sublist. Note that this method is only supported on scripted sublists via the UI Object API.
     *
     * @param {string[][]|NLObjSearchResult[]|Object} values
     */
    setLineItemValues(values: string[][]|NLObjSearchResult[]|Object): void;
    /**
     * Designate a field on sublist that must be unique across all lines (only supported on sublists of type inlineeditor, editor).
     * @param {string} fldnam the name of a field on this sublist whose value must be unique across all lines
     */
    setUniqueField(fldnam: string): NLObjField;
}

/** Primary object used to encapsulate a NetSuite subrecord. To create a subrecord, you must first create or load a parent record. You can then create or access a subrecord from a body field or from a sublist field on the parent record. */
interface NLObjSubrecord {
    /** Cancel the current processing of the subrecord and revert subrecord data to the last committed change (submitted in the last commit() call). */
    cancel(): void;
    /** Commit the subrecord after you finish modifying it. */
    commit(): void;
    /**
     * Commit the current line in a sublist.
     *
     * @param {string} 	group sublist name
     */
    commitLineItem(group: string): void;
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
     */
    setCurrentLineItemValue(group: string, name: string, value: string): void;
    /**
     * Set the value of a field.
     *
     * @param {string} name Field name
     * @param {string|number} value Field value
     */
    setFieldValue(name: string, value: string|number): void;
}

interface NLObjTab {
    /**
     * Set helper text for this tab or subtab.
     *
     * @param {string} help Inline help text used for this tab or subtab.
     */
    setHelpText(help: string): NLObjTab;
    /**
     * Set the label for this tab or subtab.
     *
     * @param {string} label String used as label for this tab or subtab.
     */
    setLabel(label: string): NLObjTab;
}

interface NLObjTemplateRenderer {
    /**
     * Binds nlobjRecord object to variable name used in template.
     * @param  {string} variable variable name that represents record
     * @param  {NLObjRecord} record NetSuite record
     */
    addRecord(variable: string, record: NLObjRecord): void;
    /**
     * Binds an nlobjSearchResult object to variable name used in template.
     * @param {string} variable variable name that represents search result
     * @param {NLObjSearchResult} searchResult NetSuite search result
     */
    addSearchResults(variable: string, searchResult: NLObjSearchResult): void;
    /**
     * Perform the merge and return an object containing email subject and body.
     * @governance 20 units
     * @return {object} pure javascript object with two properties: subject and body
     */
    merge(): { subject: string, body: string };
    /**
     * Render the output of the template engine into the response.
     * @param {NLObjResponse} nlobjResponse
     */
    renderToResponse(nlobjResponse: NLObjResponse): void;
    /**
     * Returns template content interpreted by FreeMarker as XML string that can be passed to nlapiXMLToPDF(xmlString) to produce PDF output.
     */
    renderToString(): string;
    /**
     * Associate a custom record to the merger.
     * @param  {string} recordType type of the custom record
     * @param  {number} recordId ID of the record to be associated with the merger
     */
    setCustomRecord(recordType: string, recordId: number): void;
     /**
     * Associate an entity to the merger.
     * @param  {string} entityType Type of the entity (customer/contact/partner/vendor/employee)
     * @param  {number} entityId ID of the entity to be associated with the merger.
     */
    setEntity(entityType: string, entityId: number): void;
    /**
     * Associate a second entity (recipient) to the merger.
     * @param  {string} recipientType type of the entity (customer/contact/partner/vendor/employee)
     * @param  {number} recipientId ID of the entity to be associated with the merger
     */
    setRecipient(recipientType: string, recipientId: number): void;
    /**
     * Associate a support case to the merger.
     * @param  {number} caseId ID of the support case to be associated with the merger
     */
    setSupportCase(caseId: number): void;
    /**
     * Passes in raw string of template to be transformed by FreeMarker.
     * @param  {string} template raw string of template.
     */
    setTemplate(template: string): void;
    /**
     * Associate a transaction to the merger.
     * @param  {number} transactionId ID of the transaction to be associated with the merger
     */
    setTransaction(transactionId: number): void;
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
 * @param {number|string} id1 The internal ID for the record being attached.
 * @param {string} type2 The record type name being attached to.
 * @param {number|string} id2 The internal ID for the record being attached to.
 * @param {Object} properties Object containing name/value pairs used to configure attach operation.
 */
declare function nlapiAttachRecord(type1: string, id1: number|string, type2: string, id2: number|string, properties?: Object): void;
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
declare function nlapiCreateEmailMerger(templateId: number): NLObjEmailMerger;
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
declare function nlapiCreateSearch(type: string, filters?: NLObjSearchFilter|any[], columns?: NLObjSearchColumn|NLObjSearchColumn[]): NLObjSearch;
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
 */
declare function nlapiCreateTemplateRenderer(): NLObjTemplateRenderer;
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
 * Detach a single record from another with optional properties.
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
declare function nlapiExchangeRate(fromCurrency: string|number, toCurrency: string|number, date?: string): number | string;
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
 * @param {string|number} str Numeric string used to format for display as currency using user's locale.
 */
declare function nlapiFormatCurrency(str: string|number): string;
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
declare function nlapiGetCurrentLineItemIndex(type: string): number;
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
 * Return an record object containing the data being submitted to the system for the current record.
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
declare function nlapiGetRecordId(): number | string;
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
 * @param {number} id Internal ID of the base record.
 * @param {string|number} workflowId Internal ID or script ID for the workflow definition.
 */
declare function nlapiInitiateWorkflow(recordtype: string, id: number, workflowId: string|number): number;
/**
 * Initiates a workflow on-demand and returns the workflow instance ID for the workflow-record combination.
 * @governance 20 units
 *
 * @param {string} recordtype Record type ID of the workflow base record.
 * @param {number} id Internal ID of the base record.
 * @param {string|number} workflowId Internal ID or script ID for the workflow definition.
 * @param {Object} parameters
 */
declare function nlapiInitiateWorkflowAsync(recordtype: string, id: number, workflowId: string|number, parameters: Object): number;
/**
 * Insert and select a new line into the sublist on a page or user event.
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
 * @param {Object} initializeValues Key-value pair of supported initial values.
 */
declare function nlapiLoadRecord(type: string, id: number|string, initializeValues?: any): NLObjRecord;
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
 * @param {string|number|boolean} details Log details (up to 3000 characters supported)
 */
declare function nlapiLogExecution(type: string, title: string, details?: string|number|boolean): void;
/**
 * Fetch the value of one or more fields on a record. This API uses search to look up the fields and is much
 * faster than loading the record in order to get the field.
 * @param {string} type The record type name.
 * @param {number|string} id The internal ID for the record.
 * @param {string|string[]} fields Field or fields to look up.
 * @param {boolean} text If true then the display value is returned instead for select fields.
 */
declare function nlapiLookupField(type: string, id: number|string, fields: string|string[], text?: boolean): string|Object;
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
 * Print a record (transaction) given its type, id, and output format.
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
declare function nlapiRequestURL(url: string, postdata?: string|Object, headers?: Object, callback?: Function, method?: string): NLObjServerResponse;
/**
 * Allows you to send credentials outside of NetSuite. This API securely accesses a handle to credentials that users specify in a NetSuite credential field.
 * @param {string[]} credentials List of credential handles.
 * @param {string} url A fully qualified URL to an HTTP(s) resource.
 * @param {string|Object} postData A string, document, or Object containing POST payload.
 * @param {Object} headers Object containing request headers.
 * @param {string} method HTTP method: GET, POST, PUT, DELETE, etc.
 */
declare function nlapiRequestURLWithCredentials(credentials: string[], url: string, postData: string|Object, headers: Object, method: string): NLObjServerResponse;
/**
 * Causes a custom form portlet to be resized.
 */
declare function nlapiResizePortlet(): void;
/**
 * Resolve a URL to a resource or object in the system.
 * @param {string} type Type specifier for URL: SUITELET|TASKLINK|RECORD|MEDIAITEM.
 * @param {string} subtype Subtype specifier for URL (corresponding to type): scriptid|taskid|recordtype|mediaid.
 * @param {string} id Internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a.
 * @param {string|boolean} pageMode String specifier used to configure page (suitelet: external|internal, tasklink|record: edit|view).
 */
declare function nlapiResolveURL(type: string, subtype: string, id?: string, pageMode?: string|boolean): string;
/**
 * Queue a scheduled script for immediate execution and return the status QUEUED if successful.
 * @restriction Server SuiteScript only
 * @governance 20 units
 *
 * @param {string|number} script Script ID or internal ID of scheduled script
 * @param {string|number} deployment Script ID or internal ID of scheduled script deployment. If empty, the first "free" deployment (i.e. status = Not Scheduled or Completed) will be used
 * @param {Object} parameters Object of parameter name->values used in this scheduled script instance
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
    filters?: NLObjSearchFilter|any[],
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
 * @param {number} campaignEventId Internal ID of the campaign event.
 * @param {number} recipientId Internal ID of the recipient - the recipient must have an email.
 */
declare function nlapiSendCampaignEmail(campaignEventId: number, recipientId: number): number;
/**
 * Send out an email and associate it with records in the system.
 * Supported base types are entity for entities, transaction for transactions, activity for activities and cases, record|recordtype for custom records.
 * @param {number|string} from Internal ID for employee user on behalf of whom this email is sent
 * @param {string|number} to Email address or internal ID of user that this email is being sent to.
 * @param {string} subject Email Subject.
 * @param {string} body Email body.
 * @param {string|string[]} cc Copy email address(es).
 * @param {string|string[]} bcc Blind copy email address(es).
 * @param {Object} records Object of base types -> internal IDs used to associate email to records. i.e. {entity: 100, record: 23, recordtype: customrecord_surveys}.
 * @param {NLObjFile[]} files Array of nlobjFile objects (files) to include as attachments.
 * @param {boolean} notifySenderOnBounce Controls whether or not the sender will receive email notification of bounced emails (defaults to false).
 * @param {boolean} internalOnly Controls or not the resultingMessage record will be visible to non-employees on the Communication tab of attached records (defaults to false).
 * @param {string} replyTo Email reply-to address.
 */
declare function nlapiSendEmail(
    from: number|string,
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
 * @param {boolean} fireFieldChanged If false then the field change event is suppressed (defaults to true)
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetCurrentLineItemMatrixValue(type: string, fldnam: string, column: number, value: string, fireFieldChanged?: boolean, synchronous?: boolean): void;
/**
 * Set the value of a field on the currently selected line using it's label.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type Sublist name
 * @param {string} fldnam Sublist field name
 * @param {string} txt String containing display value or search text.
 * @param {boolean} fireFieldChanged If false then the field change event is suppressed (defaults to true)
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetCurrentLineItemText(type: string, fldnam: string, txt: string, fireFieldChanged?: boolean, synchronous?: boolean): void;
/**
 * Set the value of a field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type Sublist name
 * @param {string} fldnam Sublist field name
 * @param {string|number} value Field value
 * @param {boolean} fireFieldChanged If false then the field change event is suppressed (defaults to true)
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetCurrentLineItemValue(type: string, fldnam: string, value: string|number, fireFieldChanged?: boolean, synchronous?: boolean): void;
/**
 * Set the value of a multi-select field on the currently selected line.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} type Sublist name
 * @param {string} fldnam sublist field name
 * @param {string[]} values Field values
 * @param {boolean} fireFieldChanged If false then the field change event is suppressed (defaults to true)
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetCurrentLineItemValues(type: string, fldnam: string, values: string[], fireFieldChanged?: boolean, synchronous?: boolean): void;
/**
 * Set the values of a date/time field.
 *
 * @param {string} fieldId the internal field ID of a datetime field
 * @param {string} value The date and time in format mm/dd/yyyy hh:mm:ss am|pm
 * @param {string|number} [timeZone] One of values (string) or keys (int) from the Olson Values table.
 */
declare function nlapiSetDateTimeValue(fieldId: string, value: string, timeZone?: string|number): void;
/**
 * Set whether or not a field is displayed.  This function is not documented but still works as of 2017.1.
 * @param fieldId
 * @param show
 */
declare function nlapiSetFieldDisplay(fieldId: string, show: boolean): void;
/**
 * Set the value of a field on the current record on a page using it's label.
 * @param {string} fldnam The field name.
 * @param {string} txt Display name used to lookup field value.
 * @param {boolean} fireFieldChanged If false then the field change event is suppressed (defaults to true).
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetFieldText(fldnam: string, txt: string, fireFieldChanged?: boolean, synchronous?: boolean): void;
/**
 * Set the values (via display text) of a multiselect field on the current record on a page.
 * @param {string} fldnam The field name.
 * @param {string[]} texts Array of strings containing display values for field.
 * @param {boolean} fireFieldChanged If false then the field change event is suppressed (defaults to true).
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetFieldTexts(fldnam: string, texts: string[], fireFieldChanged?: boolean, synchronous?: boolean): void;
/**
 * Set the value of a field on the current record on a page.
 * @param {string} fldnam The field name.
 * @param {string|number} value Value used to set field.
 * @param {boolean} fireFieldChanged If false then the field change event is suppressed (defaults to true).
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetFieldValue(fldnam: string, value: string|number, fireFieldChanged?: boolean, synchronous?: boolean): void;
/**
 * Set the values of a multiselect field on the current record on a page.
 * @param {string} fldnam The field name.
 * @param {string[]} values Array of strings containing values for field.
 * @param {boolean} fireFieldChanged If false then the field change event is suppressed (defaults to true).
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 */
declare function nlapiSetFieldValues(fldnam: string, values: string[], fireFieldChanged?: boolean, synchronous?: boolean): void;
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
 * @param {string|number} value
 */
declare function nlapiSetLineItemValue(type: string, fldnam: string, linenum: number, value: string|number): void;
/**
 * Set the value of a matrix header field.
 * @restriction synchronous arg is only supported in client SuiteScript
 *
 * @param {string} 	type Sublist name.
 * @param {string} 	fldnam Sublist field name.
 * @param {number} 	column Matrix column index (1-based).
 * @param {string} 	value Field value for matrix field.
 * @param {boolean} fireFieldChanged If false then the field change event is suppressed (defaults to true).
 * @param {boolean} synchronous If true then sourcing and field change execution happens synchronously (defaults to false).
 * @return {void}
 *
 * @since	2009.2
 */
declare function nlapiSetMatrixValue(type: string, fldnam: string, column: number, value: string, fireFieldChanged?: boolean, synchronous?: boolean): void;
/**
 * Creates a recovery point saving the state of the script's execution.
 */
declare function nlapiSetRecoveryPoint(): Object;
/**
 *
 * @param {string} type Type specifier for URL: suitelet|tasklink|record|mediaitem
 * @param {string} subtype Subtype specifier for URL (corresponding to type): scriptid|taskid|recordtype|mediaid
 * @param {string|number} id Internal ID specifier (sub-subtype corresponding to type): deploymentid|n/a|recordid|n/a
 * @param {boolean} editMode For RECORD calls, this determines whether to return a URL for the record in edit mode or view mode. If set to true, returns the URL to an existing record in edit mode.
 * @param {Object} parameters Additional URL parameters as name/value pairs
 */
declare function nlapiSetRedirectURL(type: string, subtype: string, id?: string|number, editMode?: boolean, parameters?: Object): void;
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
 * @param {NLObjConfiguration} setup Record
 */
declare function nlapiSubmitConfiguration(setup: NLObjConfiguration): void;
/**
 * Submits a CSV import job to asynchronously import record data into NetSuite.
 *
 * @param {NLObjCSVImport} csvImport
 */
declare function nlapiSubmitCSVImport(csvImport: NLObjCSVImport): string;
/**
 * Submit the values of a field or set of fields for an existing record.
 * @param {string} type The record type name.
 * @param {number|string} id The internal ID for the record.
 * @param {string|string[]} fields Field or fields being updated.
 * @param {number|string|string[]} values Field value or field values for updating.
 * @param {boolean} doSourcing If not set, this argument defaults to false and field sourcing does not occur.
 */
declare function nlapiSubmitField(type: string, id: number|string, fields: string|string[], values: number|string|string[], doSourcing?: boolean): void;
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
 * @param {string|number} id The internal ID for the record.
 * @param {string} transformType The recordType you are transforming the existing record into.
 * @param {Object} transformValues An object containing transform default option/value pairs used to pre-configure transformed record.
 */
declare function nlapiTransformRecord(type: string, id: string|number, transformType: string, transformValues?: Object): NLObjRecord;
/**
 * Triggers a workflow on a record.
 * @governance 20 units
 *
 * @param {string} recordtype Record type ID of the workflow base record
 * @param {number} id Internal ID of the base record
 * @param {string|number} workflowId Internal ID or script ID for the workflow definition
 * @param {string|number} actionId Internal ID or script ID of the action script
 * @param {string|number} stateId Internal ID or script ID of the state contains the referenced add button action
 */
declare function nlapiTriggerWorkflow(recordtype: string, id: number, workflowId: string|number, actionId?: string|number, stateId?: string|number): number;
/**
 * Validate that a given XML document conforms to a given XML schema. XML Schema Definition (XSD) is the expected schema format.
 *
 * @param {XMLDocument} xmlDocument xml to validate
 * @param {XMLDocument} schemaDocument schema to enforce
 * @param {string} schemaFolderId if your schema utilizes <import> or <include> tags which refer to sub-schemas by file name (as opposed to URL),
 *                 provide the Internal Id of File Cabinet folder containing these sub-schemas as the schemaFolderId argument
 * @throws {nlobjError} error containing validation failure message(s) - limited to first 10
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
 * @param {string} 	fldname Body field name.
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
