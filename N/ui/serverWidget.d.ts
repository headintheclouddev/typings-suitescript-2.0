import type {ServerResponse} from '../http';
import type {AddColumnOptions, AddEditColumnOptions, AddRowOptions, AddRowsOptions} from '../portlet';
import type {Message, MessageCreateOptions} from './message';

export interface AddButtonOptions {
    /**
     * The internal ID of the button. If you are adding the button to an existing page, the internal ID must be in lowercase, contain no spaces, and include the prefix custpage.
     * Oracle documents this parameter as required; the typings keep it optional.
     */
    id?: string;
    /** The label for this button. */
    label: string;
    /** The function name to be triggered on a click event. */
    functionName?: string;
}

interface AddCredentialFieldOptions {
    /** The internal ID of the credential field. The internal ID must be in lowercase, contain no spaces, and include the prefix custpage if you are adding the field to an existing page. */
    id: string;
    /** The label for the credential field. */
    label: string;
    /**
     * Controls whether use of this credential is restricted to the same user that originally entered the credential.
     * - By default, the value is false – multiple users can use the credential. For example, multiple clerks at a store making secure calls to a credit processor using a credential that represents the company they work for.
     * - If set to true, the credentials apply to a single user.
     */
    restrictToCurrentUser?: boolean;
    /**
     * The domain that the credentials can be sent to, such as 'www.mysite.com'. Credentials cannot be sent to a domain that is not specified here.
     * This value can be a domain or a list of domains to which the credentials can be sent.
     */
    restrictToDomains: string | string[];
    /** The ID of the script that is allowed to use this credential field. For example, 'customscript_my_script'. */
    restrictToScriptIds: string | string[];
    /** The internal ID of the tab or field group to add the credential field to. By default, the field is added to the main section of the form. */
    container?: string;
}

interface AddFieldGroupOptions {
    /** An internal ID for the field group. */
    id: string;
    /** The label for this field group. */
    label: string;
    /** The internal ID of the tab to add the field group to. By default, the field group is added to the main section of the form. */
    tab?: string;
}

interface AddFieldOptions {
    /**
     * The internal ID of the field.
     * The internal ID must be in lowercase, contain no spaces, and include
     * the prefix custpage if you are adding the field to an existing page. For
     * example, if you add a field that appears as Purchase Details, the field
     * internal ID should be something similar to custpage_purchasedetails or
     * custpage_purchase_details.
     */
    id: string;
    /** The label for this field. */
    label: string;
    /** The field type for the field. Use the serverWidget.FieldType enum to define the field type. */
    type: FieldType|string;
    /**
     * The internalId or scriptId of the source list for this field if it is a select (List/Record) or multi-select field.
     * Note: For radio fields only, the source parameter must contain the internal ID for the field.
     * For more information about working with radio buttons, see "Working with Radio Buttons" in Help.
     */
    source?: string;
    /**
     * The internal ID of the tab or field group to add the field to.
     * By default, the field is added to the main section of the form.
     */
    container?: string;
}

interface AddPageLinkOptions {
    /** The text label for the link. */
    title: string;
    /** The type of page link to add. Use the serverWidget.FormPageLinkType enum to set the value. */
    type: FormPageLinkType;
    /** The URL for the link. */
    url: string;
}

interface AddParamToURLOptions {
    param: string;
    value: string;
    /** If true, then the parameter value is actually an alias that is calculated per row. */
    dynamic?: boolean;
}

interface AddResetButtonOptions {
    /** The label used for this button. If no label is provided, the label defaults to Reset. */
    label: string;
}

interface AddSecretKeyFieldOptions {
    /** The internal ID of the secret key field. The internal ID must be in lowercase, contain no spaces, and include the prefix custpage if you are adding the field to an existing page. */
    id: string;
    label: string;
    /** Controls whether use of this secret key is restricted to the same user that originally entered the key. By default, the value is false – multiple users can use the key. */
    restrictToCurrentUser?: boolean;
    /**
     * The script ID of the script that is allowed to use this field.
     * Oracle documents this parameter as required; the typings keep it optional.
     */
    restrictToScriptIds?: string|string[];
    /** The internal ID of the tab or field group to add the field to. By default, the field is added to the main section of the form. */
    container?: string;
}

export interface AddSelectOptionOptions {
    value: string;
    text: string;
    isSelected?: boolean;
}

interface AddSublistOptions {
    /** The internal ID name of the sublist. */
    id: string;
    /** The label for this sublist. */
    label: string;
    /** The tab under which to display this sublist. If empty, the sublist is added to the main tab. */
    tab?: string;
    /** The sublist type. Use the serverWidget.SublistType enum to set the value. */
    type: SublistType;
}

interface AddSubmitButtonOptions {
    /** The label for this button. If no label is provided, the label defaults to “Save”. */
    label?: string;
}

interface AddSubtabOptions {
    /** The internal ID name of the subtab. */
    id: string;
    /** The label for this subtab. */
    label: string;
    /** The tab under which to display this sublist. If empty, the sublist is added to the main tab. */
    tab?: string;
}

interface CreateAssistantOptions {
    /** The title of the form. */
    title: string;
    /**
     * Indicates whether to hide the navigation bar menu.
     * By default, set to false. The header appears in the top-right corner on the form.
     * If set to true, the header on the assistant is hidden from view.
     */
    hideNavBar?: boolean;
}

interface IDOptions {
    /** The internal ID name of the field. */
    id: string;
}

interface GetFieldIdsByFieldGroupOptions {
    /** The internal ID of the field group. */
    fieldGroup: string;
}

interface GetSelectOptionsOpts {
    /**
     * A search string to filter the select options that are returned. For example, if there are 50 select options available, and 10 of the options contains 'John', e.g. “John Smith” or “Shauna Johnson”, only those 10 options will be returned.
     * Filter values are case insensitive. The filters 'John' and 'john' will return the same select options.
     */
    filter?: string;
    /** Supported operators are contains | is | startswith. If not specified, defaults to the contains operator. */
    filteroperator?: 'contains' | 'is' | 'startswith';
}

interface GetSublistFieldIdsOptions { // Part of Assistant Step.
    /** The sublist internal ID. */
    group: string;
}

interface GetSublistValueOptions {
    /** The internal ID of the sublist. */
    group: string;
    /** The internal ID of the sublist field. */
    id: string;
    /** The line number for the sublist field (starts at 0). */
    line: number;
}

interface InsertFieldOptions {
    /** The Field object to insert. */
    field: Field;
    /** The internal ID name of the field you are inserting a field in front of. */
    nextfield: string;
}

interface InsertSublistOptions {
    /** The Sublist object to insert. */
    sublist: Sublist;
    /** The internal ID name of the sublist you are inserting a sublist in front of. */
    nextsublist: string;
}

interface InsertTabOptions {
    /** The Tab object to insert. */
    tab: Tab;
    /** The internal ID name of the tab you are inserting a tab in front of. */
    nexttab: string;
}

interface InsertSubtabOptions {
    /** The Subtab object to insert. */
    subtab: Tab;
    /** The internal ID name of the subtab you are inserting a subtab in front of. */
    nextsubtab: string;
}

interface SetHelpTextOptions {
    /** The text in the field help popup. */
    help: string;
    /** If set to true, the field help will display inline below the field on the assistant, and in a field help popup. */
    showInlineForAssistant?: boolean;
}

interface SublistGetSublistValueOptions {
    /** The sublist internal ID (for example, use addressbook as the ID for the Address sublist). */
    id: string;
    /** The line number for this field (starts at 0). */
    line: number;
}

interface SublistInsertFieldOptions {
    /** The Field object to insert. */
    field: Field;
    /** Used to specify whether the field is inserted before or after the next field (options.nextfield).*/
    isBefore: boolean;
    /** The internal ID name of the field you are inserting a field in front of. */
    nextfield: string;
}

interface SublistSetSublistValueOptions {
    /** The internal ID name of the line item field being set. */
    id: string;
    /** The line number for this field (starts at 0). */
    line: number;
    /** The value for the field being set. Use null instead of an empty string. */
    value: string|null;
}

interface SetSplashOptions {
    /** The title of the splash screen. */
    title: string;
    /** Text for the splash screen. */
    text1: string;
    /** Text for a second column on the splash screen, if desired. */
    text2?: string;
}

interface SetURLOptions {
    /** The base URL or a column in the data source that returns the base URL for each row. */
    url: string;
    /** If true, then the URL is actually an alias that is calculated per row. */
    dynamic?: boolean;
}

interface UpdateBreakTypeOptions {
    /** The break type of the field. */
    breakType: FieldBreakType;
}

interface UpdateDisplaySizeOptions {
    /** The new height of the field. */
    height: number;
    /** The new width of the field. */
    width: number;
}

interface UpdateDisplayTypeOptions {
    /** The new display type of the field. Set this value with the serverWidget.FieldDisplayType enum. */
    displayType: FieldDisplayType;
}

interface UpdateLayoutTypeOptions {
    /** The new layout type of the field. Set this value with the serverWidget.FieldLayoutType enum. */
    layoutType: FieldLayoutType;
}

interface SendRedirectOptions {
    /** Set a redirect for the assistant to go back to */
    response: ServerResponse;
}

/** Encapsulates a scriptable, multi-step NetSuite assistant. Each page of the assistant is defined by a step. */
export interface Assistant {
    /**
     * Adds a field to an assistant.
     * @governance none
     * @since 2015.2
     */
    addField(options: AddFieldOptions): Field;
    /**
     * Adds a field group to the assistant.
     * @governance none
     * @since 2015.2
     */
    addFieldGroup(options: AddFieldGroupOptions): FieldGroup;
    /**
     * Adds a step to an assistant.
     * @governance none
     * @since 2015.2
     */
    addStep(options: AddFieldGroupOptions): AssistantStep;
    /**
     * Adds a sublist to an assistant.
     * @governance none
     * @since 2015.2
     */
    addSublist(options: AddSublistOptions): Sublist;
    /**
     * Returns a field object on an assistant page.
     * @governance none
     * @since 2015.2
     */
    getField(options: IDOptions): Field;
    /**
     * Returns a field group on an assistant page.
     * @governance none
     * @since 2015.2
     */
    getFieldGroup(options: IDOptions): FieldGroup;
    /**
     * Retrieves all the internal IDs for field groups in an assistant.
     * @governance none
     * @since 2015.2
     */
    getFieldGroupIds(): string[];
    /**
     * Gets all the internal IDs for fields in an assistant.
     * @governance none
     * @since 2015.2
     */
    getFieldIds(): string; // not string[]?? may need testing.
    /**
     * Gets all field IDs in the assistant field group.
     * @governance none
     * @since 2016.1
     */
    getFieldIdsByFieldGroup(options: GetFieldIdsByFieldGroupOptions): string[];
    /**
     * Gets the last action taken by the user. To identify the step that the last action came from, use Assistant.getLastStep().
     * @governance none
     * @since 2015.2
     */
    getLastAction(): AssistantSubmitAction;
    /**
     * Gets the step associated with the last action submitted by the user.
     * @governance none
     * @since 2015.2
     */
    getLastStep(): AssistantStep;
    /**
     * Gets the next step corresponding to the user's last submitted action in the assistant. If you need information about the last step, use Assistant.getLastStep() before you use this method.
     * @governance none
     * @since 2015.2
     */
    getNextStep(): AssistantStep;
    /**
     * Returns a step in an assistant.
     * @governance none
     * @since 2015.2
     */
    getStep(options: IDOptions): AssistantStep;
    /**
     * Gets the total number of steps in an assistant.
     * @governance none
     * @since 2015.2
     */
    getStepCount(): number;
    /**
     * Gets all the steps in an assistant.
     * @governance none
     * @since 2015.2
     */
    getSteps(): AssistantStep[];
    /**
     * Returns a sublist in an assistant.
     * @governance none
     * @since 2015.2
     */
    getSublist(options: IDOptions): Sublist;
    /**
     * Gets the IDs for all the sublists in an assistant.
     * @governance none
     * @since 2015.2
     */
    getSublistIds(): string[];
    /**
     * Determine whether an assistant has an error message to display for the current step.
     * @governance none
     * @since 2015.2
     */
    hasErrorHtml(): boolean;
    /**
     * Indicates whether all steps in an assistant are completed.
     * @governance none
     * @since 2015.2
     */
    isFinished(): boolean;
    /**
     * Manages redirects in an assistant.
     * This method also addresses the case in which one assistant redirects to another assistant.
     * In this scenario, the second assistant must return to the first assistant if the user Cancels or Finishes. This method, when used in the second assistant, ensures that users are redirected back to the first assistant.
     * @governance none
     * @since 2015.2
     */
    sendRedirect(options: SendRedirectOptions): void;
    /**
     * Defines a splash message.
     * @governance none
     * @since 2015.2
     */
    setSplash(options: SetSplashOptions): void;
    /**
     * Sets the default values of an array of fields that are specific to the assistant.
     * @governance none
     * @since 2016.1
     */
    updateDefaultValues(values: any): void;
    /**
     * The file cabinet ID of client script file to be used in this assistant.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you attempt to set this value when Assistant.clientScriptModulePath has already been specified.
     * @since 2015.2
     */
    clientScriptFileId: number;
    /**
     * The relative path to the client script file to be used in this assistant.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you attempt to set this value when Assistant.clientScriptFileId has already been specified.
     * @since 2016.2
     */
    clientScriptModulePath: string;
    /**
     * Identifies the current step. You can set any step as the current step.
     * @since 2015.2
     */
    currentStep?: AssistantStep;
    /**
     * Error message text for the current step. Optionally, you can use HTML tags to format the message.
     * @since 2015.2
     */
    errorHtml: string | undefined;
    /**
     * The text to display after the assistant finishes. For example “You have completed the Small Business Setup Assistant. Take the rest of the day off”. To trigger display of the completion message, call Assistant.isFinished().
     * @since 2015.2
     */
    finishedHtml: string;
    /**
     * Indicates whether to show or hide the Add to Shortcuts link that appears in the top-right corner of an assistant page.
     * @since 2015.2
     */
    hideAddToShortcutsLink: boolean;
    /**
     * Indicates whether assistant steps are displayed with numbers.
     * @since 2015.2
     */
    hideStepNumber: boolean;
    /**
     * Indicates whether steps must be completed in a particular sequence.
     * @since 2015.2
     */
    isNotOrdered: boolean;
    /**
     * The title for the assistant. The title appears at the top of all assistant pages. This value overrides the title specified in serverWidget.createAssistant(options).
     * @since 2015.2
     */
    title: string;
}

export interface AssistantStep {
    /**
     * Gets the IDs for all the fields in a step.
     * @governance none
     * @since 2015.2
     */
    getFieldIds(): string[];
    /** Gets the IDs for all the sublist fields (line items) in a step. */
    getSublistFieldIds(options: GetSublistFieldIdsOptions): string[];
    /**
     * Gets the number of lines on a sublist in a step.
     * @governance none
     * @since 2015.2
     */
    getLineCount(options: GetSublistFieldIdsOptions): number;
    /**
     * Gets the IDs for all the sublists submitted in a step.
     * @governance none
     * @since 2015.2
     */
    getSubmittedSublistIds(): string[];
    /**
     * Gets the current value of a sublist field (line item) in a step.
     * @governance none
     * @since 2015.2
     */
    getSublistValue(options: GetSublistValueOptions): string;
    /**
     * Gets the current value(s) of a field or multi-select field.
     * @governance none
     * @since 2015.2
     */
    getValue(options: IDOptions): string | string[];
    /**
     * The help text for a step.
     * @since 2015.2
     */
    helpText: string;
    /**
     * The internal ID of the step.
     * @since 2015.2
     */
    id: string;
    /**
     * The label for the step.
     * @since 2015.2
     */
    label: string;
    /**
     * Indicates where this step appears sequentially in the assistant.
     * @since 2015.2
     */
    stepNumber: number;
}

/** Encapsulates button that appears in a UI object. */
export interface Button {
    /**
     * Indicates whether a button is grayed-out and disabled.
     * @since 2015.2
     */
    isDisabled: boolean;
    /**
     * Indicates whether the button is hidden in the UI.
     * @since 2015.2
     */
    isHidden: boolean;
    /**
     * The label for the button.
     * @since 2015.2
     */
    label: string;
}

/** Encapsulates a NetSuite field. */
export interface Field {
    /**
     * Adds the select options that appears in the dropdown of a field.
     * @governance none
     * @since 2015.2
     */
    addSelectOption(options: AddSelectOptionOptions): void;
    /**
     * Obtains a list of available options on a select field.
     * @governance none
     * @since 2015.2
     */
    getSelectOptions(options?: GetSelectOptionsOpts): any[];
    /**
     * Sets the help text for the field.
     * @governance none
     * @since 2015.2
     */
    setHelpText(options: SetHelpTextOptions): Field;
    /**
     * Updates the width and height of the field. Only supported on multi-selects, long text, rich text, and fields
     * that get rendered as INPUT (type=text) fields. This function is not supported on list/record fields.
     * NOTE: If this method doesn't work, try directly seeing the richTextHeight or richTextWidth properties instead.
     * @governance none
     * @since 2015.2
     */
    updateDisplaySize(options: UpdateDisplaySizeOptions): Field;
    /**
     * Updates the display type for the field.
     * @governance none
     * @since 2016.1
     */
    updateDisplayType(options: UpdateDisplayTypeOptions): Field;
    /**
     * Updates the break type used to add a break in flow layout for the field.
     * @governance none
     * @since 2016.1
     */
    updateBreakType(options: UpdateBreakTypeOptions): Field;
    /**
     * Updates the layout type for the field.
     * @governance none
     * @since 2016.1
     */
    updateLayoutType(options: UpdateLayoutTypeOptions): Field;
    /**
     * An alternate name that you can assign to a serverWidget.Field object.
     * @since 2015.2
     */
    alias: string;
    /**
     * The default value for this field.
     * @since 2015.2
     */
    defaultValue: string | string[] | number;
    /**
     * The field internal ID.
     * @since 2015.2
     */
    id: string;
    /**
     * Indicates whether the field is mandatory or optional.
     * @since 2015.2
     */
    isMandatory: boolean;
    /**
     * The field label. There is a 40-character limit for custom field labels.
     * @since 2015.2
     */
    label: string;
    /**
     * The text displayed for a link in place of the URL.
     * @since 2015.2
     */
    linkText: string;
    /**
     * The maximum length, in characters, of the field (only valid for text, rich text, long text, and textarea fields).
     * @since 2015.2
     */
    maxLength: number;
    /**
     * The number of empty vertical character spaces above the field.
     * @since 2015.2
     */
    padding: number;
    /**
     * The height of a rich text field, in pixels. The minimum value is 100 pixels and the maximum value is 500 pixels.
     * @since 2015.2
     */
    richTextHeight: number;
    /**
     * The width of a rich text field, in pixels. The minimum value is 250 pixels and the maximum value is 800 pixels.
     * @since 2015.2
     */
    richTextWidth: number;
    /**
     * The field type. For example, text, date, currency, select, checkbox etc.
     * @since 2015.2
     */
    type: FieldType;
}

/** Encapsulates a field group on serverWidget.createAssistant(options) objects and on serverWidget.Form objects. */
export interface FieldGroup {
    /**
     * Indicates whether the field group can be collapsed.
     * @since 2015.2
     */
    isBorderHidden: boolean;
    /**
     * Indicates whether the field group can be collapsed.
     * @since 2015.2
     */
    isCollapsible: boolean;
    /**
     * Indicates whether field group is collapsed or expanded.
     * @since 2015.2
     */
    isCollapsed: boolean;
    /**
     * Indicates whether the field group is aligned.
     * @since 2015.2
     */
    isSingleColumn: boolean;
    /**
     * The label for the field group.
     * @since 2015.2
     */
    label: string;
}

export interface BaseForm {
    /**
     * @governance none
     * @since 2015.2
     */
    addField(options: AddFieldOptions): Field;
    /**
     * The file cabinet ID of client script file to be used in this form.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you attempt to set this value when clientScriptModulePath has already been specified.
     * @since 2015.2
     */
    clientScriptFileId: number;
    /**
     * The relative path to the client script file to be used in this form. Use this property when attaching an ad-hoc client script to a server-side script.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you attempt to set this value when clientScriptFileId has already been specified.
     * @since 2016.2
     */
    clientScriptModulePath: string;
    /**
     * The title used for the form.
     * @since 2015.2
     */
    title: string;
}

/** Encapsulates a NetSuite-looking form. */
export interface Form extends BaseForm {
    /**
     * Adds a button to a form.
     * @governance none
     * @since 2015.2
     */
    addButton(options: AddButtonOptions): Button;
    /**
     * @governance none
     * @since 2015.2
     */
    addCredentialField(options: AddCredentialFieldOptions): Field;
    /**
     * @governance none
     * @since 2015.2
     */
    addFieldGroup(options: AddFieldGroupOptions): FieldGroup;
    /**
     * @governance none
     * @since 2018.2
     */
    addPageInitMessage(options: { message: Message } | MessageCreateOptions): void;
    /**
     * @governance none
     * @since 2015.2
     */
    addPageLink(options: AddPageLinkOptions): void;
    /**
     * @governance none
     * @since 2015.2
     */
    addResetButton(options?: AddResetButtonOptions): Button;
    /**
     * @governance none
     * @since 2016.1
     */
    addSecretKeyField(options: AddSecretKeyFieldOptions): Field;
    /**
     * @governance none
     * @since 2015.2
     */
    addSublist(options: AddSublistOptions): Sublist;
    /**
     * @governance none
     * @since 2016.1
     */
    addSubmitButton(options?: AddSubmitButtonOptions): Button;
    /**
     * @governance none
     * @since 2015.2
     */
    addSubtab(options: AddSubtabOptions): Tab;
    /**
     * @governance none
     * @since 2015.2
     */
    addTab(options: AddFieldGroupOptions): Tab;
    /**
     * @governance none
     * @since 2015.2
     */
    getButton(options: IDOptions): Button;
    /**
     * @governance none
     * @since 2015.2
     */
    getField(options: IDOptions): Field;
    /**
     * @governance none
     * @since 2015.2
     */
    getSublist(options: IDOptions): Sublist;
    /**
     * @governance none
     * @since 2015.2
     */
    getSubtab(options: IDOptions): Tab;
    /**
     * @governance none
     * @since 2016.1
     */
    getTab(options: { id: string }): Tab;
    /**
     * Returns an array that contains the internal IDs of all tabs in a form.
     * @governance none
     * @since 2015.2
     */
    getTabs(): string[];
    /**
     * @governance none
     * @since 2015.2
     */
    insertField(options: InsertFieldOptions): Field;
    /**
     * @governance none
     * @since 2015.2
     */
    insertSublist(options: InsertSublistOptions): Sublist;
    /**
     * @governance none
     * @since 2015.2
     */
    insertSubtab(options: InsertSubtabOptions): Tab;
    /**
     * @governance none
     * @since 2015.2
     */
    insertTab(options: InsertTabOptions): Tab;
    /**
     * Updates the default values of multiple fields on the form.
     * @governance none
     * @since 2016.1
     */
    updateDefaultValues(values: any): void;
    /**
     * @governance none
     * @since 2015.2
     */
    removeButton(options: IDOptions): void;
}

export interface List {
    /**
     * Adds a button to a list
     * @governance none
     * @since 2015.2
     */
    addButton(options: AddButtonOptions): Button;
    /**
     * Adds a column to a list.
     * The CHECKBOX, DATETIME, DATETIMETZ, FILE, HELP, INLINEHTML, LABEL, MULTISELECT, SELECT and RADIO field types are not supported.
     * @governance none
     * @since 2015.2
     */
    addColumn(options: AddColumnOptions): ListColumn;
    /**
     * Adds a column containing Edit or Edit/view links to a Suitelet or Portlet list
     * @governance none
     * @since 2015.2
     */
    addEditColumn(options: AddEditColumnOptions): ListColumn;
    /**
     * Adds a link to a list
     * @governance none
     * @since 2015.2
     */
    addPageLink(options: AddPageLinkOptions): void;
    /**
     * Adds a single row to a list
     * @governance none
     * @since 2015.2
     */
    addRow(options: AddRowOptions): void;
    /**
     * Adds multiple rows to a list
     * @governance none
     * @since 2015.2
     */
    addRows(options: AddRowsOptions): void;
    /**
     * The file cabinet ID of client script file to be used in this list
     * @deprecated Not a NetSuite property. Use List.clientScriptFileId instead.
     */
    clientScriptField: number;
    /**
     * The relative path to the client script file to be used in this list
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you attempt to set this value when List.clientScriptFileId has already been specified.
     * @since 2016.2
     */
    clientScriptModulePath: string;
    /**
     * Sets the display style for this list
     * @since 2015.2
     */
    style: ListStyle;
    /**
     * Sets the List title.
     * @since 2015.2
     */
    title: string;
}

interface ListColumn {
    /**
     * Adds a URL parameter (optionally defined per row) to the list column's URL. Use in a Suitelet only.
     * @governance none
     * @since 2016.1
     */
    addParamToURL(options: AddParamToURLOptions): ListColumn;
    /**
     * Sets the base URL for the list column.
     * @governance none
     * @since 2016.1
     */
    setURL(options: SetURLOptions): ListColumn;
    /** @since 2016.1 */
    label: string;
}

export interface Sublist {
    /**
     * Adds a button to a sublist.
     * @governance none
     * @since 2015.2
     */
    addButton(options: AddButtonOptions): Button;
    /**
     * Adds a field to a sublist.
     * @governance none
     * @since 2015.2
     */
    addField(options: AddFieldOptions): Field;
    /**
     * Adds a Mark All and an Unmark All button to a LIST type of sublist.
     * @governance none
     * @since 2015.2
     */
    addMarkAllButtons(): Button;
    /**
     * Adds a Refresh button to a LIST type of sublist.
     * @governance none
     * @since 2015.2
     */
    addRefreshButton(): Button;
    /**
     * This isn't documented, but it is a thing, apparently.
     * @governance none
     * @since 2016.2
     */
    getField(options: IDOptions): Field;
    /**
     * Gets a field value on a sublist.
     * @throws {SuiteScriptError} SSS_MISSING_REQD_ARGUMENT if a required parameter is not passed.
     * @governance none
     * @since 2015.2
     */
    getSublistValue(options: SublistGetSublistValueOptions): string;
    /**
     * Insert a field in a sublist before or after another field.
     * @governance none
     * @since 2024.2
     */
    insertField(options: SublistInsertFieldOptions): void;
    /**
     * Sets the value of a sublist field.
     * @governance none
     * @since 2015.2
     */
    setSublistValue(options: SublistSetSublistValueOptions): string;
    /**
     * Updates the ID of a field designated as a totalling column, which is used to calculate and display a running total for the sublist.
     * @governance none
     * @since 2015.2
     */
    updateTotallingFieldId(options: { id: string }): Sublist;
    /**
     * Updates a field ID that is to have unique values across the rows in the sublist.
     * @governance none
     * @since 2015.2
     */
    updateUniqueFieldId(options: { id: string }): Sublist;
    /** @since 2015.2 */
    displayType: SublistDisplayType;
    /** @since 2015.2 */
    helpText: string;
    /** @since 2015.2 */
    label: string;
    /** @since 2015.2 */
    lineCount: number;
    /** @deprecated Not documented by Oracle as a member of serverWidget.Sublist. */
    name: string
}

export interface Tab {
    /** @since 2015.2 */
    helpText: string;
    /** @since 2015.2 */
    label: string;
}

/**
 * @governance none
 * @since 2015.2
 */
export function createList(options: CreateAssistantOptions): List;

/**
 * @governance none
 * @since 2015.2
 */
export function createAssistant(options: CreateAssistantOptions): Assistant;

/**
 * Creates a form object.
 * @governance none
 * @since 2015.2
 */
export function createForm(options: CreateAssistantOptions): Form;

/** @since 2015.2 */
export enum AssistantSubmitAction {
    BACK,
    CANCEL,
    FINISH,
    JUMP,
    NEXT,
}

/** @since 2015.2 */
export enum FieldBreakType {
    NONE,
    STARTCOL,
    STARTROW,
}

/** @since 2015.2 */
export enum FieldDisplayType {
    DISABLED,
    ENTRY,
    HIDDEN,
    INLINE,
    NODISPLAY,
    NORMAL,
    READONLY,
}

/** @since 2015.2 */
export enum FieldLayoutType {
    ENDROW,
    NORMAL,
    MIDROW,
    OUTSIDE,
    OUTSIDEBELOW,
    OUTSIDEABOVE,
    STARTROW,
}

/** @since 2015.2 */
export enum FieldType {
    CHECKBOX,
    CURRENCY,
    DATE,
    DATETIMETZ,
    EMAIL,
    FILE,
    FLOAT,
    HELP,
    INLINEHTML,
    INTEGER,
    IMAGE,
    LABEL,
    LONGTEXT,
    MULTISELECT,
    PASSPORT,
    PASSWORD,
    PERCENT,
    PHONE,
    SELECT,
    RADIO,
    RICHTEXT,
    TEXT,
    TEXTAREA,
    TIMEOFDAY,
    URL
}

/** @since 2015.2 */
export enum FormPageLinkType {
    BREADCRUMB,
    CROSSLINK,
}

/** @since 2015.2 */
export enum LayoutJustification {
    CENTER,
    LEFT,
    RIGHT,
}

/** @since 2015.2 */
export enum ListStyle {
    GRID,
    REPORT,
    PLAIN,
    NORMAL,
}

/** @since 2015.2 */
export enum SublistDisplayType {
    HIDDEN,
    NORMAL,
}

/** @since 2015.2 */
export enum SublistType {
    EDITOR,
    INLINEEDITOR,
    LIST,
    STATICLIST,
}
