import {Operator} from '../search';
import {ServerResponse} from 'N/http';
import {AddColumnOptions, AddEditColumnOptions, AddRowOptions, AddRowsOptions} from 'N/portlet';
import {MessageCreateOptions} from 'N/ui/message';

interface AddButtonOptions {
    /** The internal ID of the button. If you are adding the button to an existing page, the internal ID must be in lowercase, contain no spaces, and include the prefix custpage. */
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
    /** The script ID of the script that is allowed to use this field. */
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

interface GetFieldIdsByFIeldGroupOptions {
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

interface SublistSetSublistValueOptions {
    /** The internal ID name of the line item field being set. */
    id: string;
    /** The line number for this field (starts at 0). */
    line: number;
    /** The value for the field being set. */
    value: string;
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
    /** Adds a field to an assistant. */
    addField(options: AddFieldOptions): Field;
    /** Adds a field group to the assistant. */
    addFieldGroup(options: AddFieldGroupOptions): FieldGroup;
    /** Adds a step to an assistant. */
    addStep(options: AddFieldGroupOptions): AssistantStep;
    /** Adds a sublist to an assistant. */
    addSublist(options: AddSublistOptions): Sublist;
    /** Returns a field object on an assistant page. */
    getField(options: IDOptions): Field;
    /** Returns a field group on an assistant page. */
    getFieldGroup(options: IDOptions): FieldGroup;
    /** Retrieves all the internal IDs for field groups in an assistant. */
    getFieldGroupIds(): string[];
    /** Gets all the internal IDs for fields in an assistant. */
    getFieldIds(): string; // not string[]?? may need testing.
    /** Gets all field IDs in the assistant field group. */
    getFieldIdsByFieldGroup(options: GetFieldIdsByFIeldGroupOptions): string[];
    /** Gets the last action taken by the user. To identify the step that the last action came from, use Assistant.getLastStep(). */
    getLastAction(): AssistantSubmitAction;
    /** Gets the step associated with the last action submitted by the user. */
    getLastStep(): AssistantStep;
    /** Gets the next step corresponding to the user's last submitted action in the assistant. If you need information about the last step, use Assistant.getLastStep() before you use this method. */
    getNextStep(): AssistantStep;
    /** Returns a step in an assistant. */
    getStep(options: IDOptions): AssistantStep;
    /** Gets the total number of steps in an assistant. */
    getStepCount(): number;
    /** Gets all the steps in an assistant. */
    getSteps(): AssistantStep[];
    /** Returns a sublist in an assistant. */
    getSublist(options: IDOptions): Sublist;
    /** Gets the IDs for all the sublists in an assistant. */
    getSublistIds(): string[];
    /** Determine whether an assistant has an error message to display for the current step. */
    hasErrorHtml(): boolean;
    /** Indicates whether all steps in an assistant are completed. */
    isFinished(): boolean;
    /**
      * Manages redirects in an assistant.
      * This method also addresses the case in which one assistant redirects to another assistant.
      * In this scenario, the second assistant must return to the first assistant if the user Cancels or Finishes. This method, when used in the second assistant, ensures that users are redirected back to the first assistant.
      */
    sendRedirect(options: SendRedirectOptions): void;
    /** Defines a splash message. */
    setSplash(options: SetSplashOptions): void;
    /** Sets the default values of an array of fields that are specific to the assistant. */
    updateDefaultValues(values: any): void;
    /** The file cabinet ID of client script file to be used in this assistant. */
    clientScriptFileId: number;
    /** The relative path to the client script file to be used in this assistant. */
    clientScriptModulePath: string;
    /** Identifies the current step. You can set any step as the current step. */
    currentStep: AssistantStep;
    /** Error message text for the current step. Optionally, you can use HTML tags to format the message. */
    errorHtml: string;
    /** The text to display after the assistant finishes. For example “You have completed the Small Business Setup Assistant. Take the rest of the day off”. To trigger display of the completion message, call Assistant.isFinished(). */
    finishedHtml: string;
    /** Indicates whether to show or hide the Add to Shortcuts link that appears in the top-right corner of an assistant page. */
    hideAddToShortcutsLink: boolean;
    /** Indicates whether assistant steps are displayed with numbers. */
    hideStepNumber: boolean;
    /** Indicates whether steps must be completed in a particular sequence. */
    isNotOrdered: boolean;
    /** The title for the assistant. The title appears at the top of all assistant pages. This value overrides the title specified in serverWidget.createAssistant(options). */
    title: string;
}

export interface AssistantStep {
    /** Gets the IDs for all the fields in a step. */
    getFieldIds(): string[];
    /** Gets the IDs for all the sublist fields (line items) in a step. */
    getSublistFieldIds(options: GetSublistFieldIdsOptions): string[];
    /** Gets the number of lines on a sublist in a step. */
    getLineCount(options: GetSublistFieldIdsOptions): number;
    /** Gets the IDs for all the sublists submitted in a step. */
    getSubmittedSublistIds(): string[];
    /** Gets the current value of a sublist field (line item) in a step. */
    getSublistValue(options: GetSublistValueOptions): string;
    /** Gets the current value(s) of a field or multi-select field. */
    getValue(options: IDOptions): string | string[];
    /** The help text for a step. */
    helpText: string;
    /** The internal ID of the step. */
    id: string;
    /** The label for the step. */
    label: string;
    /** Indicates where this step appears sequentially in the assistant. */
    stepNumber: number;
}

/** Encapsulates button that appears in a UI object. */
export interface Button {
    /** Indicates whether a button is grayed-out and disabled. */
    isDisabled: boolean;
    /** Indicates whether the button is hidden in the UI. */
    isHidden: boolean;
    /** The label for the button. */
    label: string;
}

/** Encapsulates a NetSuite field. */
export interface Field {
    /** Adds the select options that appears in the dropdown of a field. */
    addSelectOption(options: AddSelectOptionOptions): void;
    /** Obtains a list of available options on a select field. */
    getSelectOptions(options?: GetSelectOptionsOpts): any[];
    /** Sets the help text for the field. */
    setHelpText(options: SetHelpTextOptions): Field;
    /**
     * Updates the width and height of the field. Only supported on multi-selects, long text, rich text, and fields
     * that get rendered as INPUT (type=text) fields. This function is not supported on list/record fields.
     * NOTE: If this method doesn't work, try directly seeing the richTextHeight or richTextWidth properties instead.
     */
    updateDisplaySize(options: UpdateDisplaySizeOptions): Field;
    /** Updates the display type for the field. */
    updateDisplayType(options: UpdateDisplayTypeOptions): Field;
    /** Updates the break type used to add a break in flow layout for the field. */
    updateBreakType(options: UpdateBreakTypeOptions): Field;
    /** Updates the layout type for the field. */
    updateLayoutType(options: UpdateLayoutTypeOptions): Field;
    /** An alternate name that you can assign to a serverWidget.Field object. */
    alias: string;
    /** The default value for this field. */
    defaultValue: string | string[];
    /** The field internal ID. */
    id: string;
    /** Indicates whether the field is mandatory or optional. */
    isMandatory: boolean;
    /** The field label. There is a 40-character limit for custom field labels. */
    label: string;
    /** The text displayed for a link in place of the URL. */
    linkText: string;
    /** The maximum length, in characters, of the field (only valid for text, rich text, long text, and textarea fields). */
    maxLength: number;
    /** The number of empty vertical character spaces above the field. */
    padding: number;
    /** The height of a rich text field, in pixels. The minimum value is 100 pixels and the maximum value is 500 pixels. */
    richTextHeight: number;
    /** The width of a rich text field, in pixels. The minimum value is 250 pixels and the maximum value is 800 pixels. */
    richTextWidth: number;
    /** The field type. For example, text, date, currency, select, checkbox etc. */
    type: FieldType;
}

/** Encapsulates a field group on serverWidget.createAssistant(options) objects and on serverWidget.Form objects. */
export interface FieldGroup {
    /** Indicates whether the field group can be collapsed. */
    isBorderHidden: boolean;
    /** Indicates whether the field group can be collapsed. */
    isCollapsible: boolean;
    /** Indicates whether field group is collapsed or expanded. */
    isCollapsed: boolean;
    /** Indicates whether the field group is aligned. */
    isSingleColumn: boolean;
    /** The label for the field group. */
    label: string;
}

export interface BaseForm {
    addField(options: AddFieldOptions): Field;
    /** The file cabinet ID of client script file to be used in this form. */
    clientScriptFileId: number;
    /** The relative path to the client script file to be used in this form. Use this property when attaching an ad-hoc client script to a server-side script. */
    clientScriptModulePath: string;
    /** The title used for the form. */
    title: string;
}

/** Encapsulates a NetSuite-looking form. */
export interface Form extends BaseForm {
    /** Adds a button to a form. */
    addButton(options: AddButtonOptions): Button;
    addCredentialField(options: AddCredentialFieldOptions): Field;
    addFieldGroup(options: AddFieldGroupOptions): FieldGroup;
    addPageInitMessage(options: MessageCreateOptions): void;
    addPageLink(options: AddPageLinkOptions): void;
    addResetButton(options?: AddResetButtonOptions): Button;
    addSecretKeyField(options: AddSecretKeyFieldOptions): Field;
    addSublist(options: AddSublistOptions): Sublist;
    addSubmitButton(options?: AddSubmitButtonOptions): void;
    addSubtab(options: AddSubtabOptions): Tab;
    addTab(options: AddFieldGroupOptions): Tab;
    getButton(options: IDOptions): Button;
    getField(options: IDOptions): Field;
    getSublist(options: IDOptions): Sublist;
    getSubtab(options: IDOptions): Tab;
    getTab(options: { id: string }): Tab;
    getTabs(): Tab[];
    insertField(options: InsertFieldOptions): Field;
    insertSublist(options: InsertSublistOptions): Sublist;
    insertSubtab(options: InsertSubtabOptions): Tab;
    insertTab(options: InsertTabOptions): Tab;
    /** Updates the default values of multiple fields on the form. */
    updateDefaultValues(values: any): void;
    removeButton(options: IDOptions): void;
}

export interface List { 
    /** Adds a button to a list */
    addButton(options: AddButtonOptions): Button;
    /** Adds a column to a list */
    addColumn(options: AddColumnOptions): ListColumn;
    /** Adds a column containing Edit or Edit/view links to a Suitelet or Portlet list */
    addEditColumn(options: AddEditColumnOptions): ListColumn;
    /** Adds a link to a list */
    addPageLink(options: AddPageLinkOptions): void;
    /** Adds a single row to a list */
    addRow(options: AddRowOptions): void;
    /** Adds multiple rows to a list */
    addRows(options: AddRowsOptions): void;
    /** The file cabinet ID of client script file to be used in this list */
    clientScriptField: number;
    /** The relative path to the client script file to be used in this list */
    clientScriptModulePath: string;
    /** Sets the display style for this list */
    style: string;
    /** Sets the List title. */
    title: string;
}

interface ListColumn {
    /** Adds a URL parameter (optionally defined per row) to the list column's URL. Use in a Suitelet only. */
    addParamToURL(options: AddParamToURLOptions): ListColumn;
    /** Sets the base URL for the list column. */
    setURL(options: SetURLOptions): ListColumn;
    label: string;
}

export interface Sublist {
    /** Adds a button to a sublist. */
    addButton(options: AddButtonOptions): Button;
    /** Adds a field to a sublist. */
    addField(options: AddFieldOptions): Field;
    /** Adds a Mark All and an Unmark All button to a LIST type of sublist. */
    addMarkAllButtons(): Button;
    /** Adds a Refresh button to a LIST type of sublist. */
    addRefreshButton(): Button;
    /** This isn't documented, but it is a thing, apparently. */
    getField(options: IDOptions): Field;
    /** Gets a field value on a sublist. */
    getSublistValue(options: SublistGetSublistValueOptions): string;
    /** Sets the value of a sublist field. */
    setSublistValue(options: SublistSetSublistValueOptions): string;
    /** Updates the ID of a field designated as a totalling column, which is used to calculate and display a running total for the sublist. */
    updateTotallingFieldId(options: { id: string }): Sublist;
    /** Updates a field ID that is to have unique values across the rows in the sublist. */
    updateUniqueFieldId(options: { id: string }): Sublist;
    displayType: SublistDisplayType;
    helpText: string;
    label: string;
    lineCount: number;
    name: string
}

export interface Tab {
    helpText: string;
    label: string;
}

export function createList(options: CreateAssistantOptions): List;

export function createAssistant(options: CreateAssistantOptions): Assistant;

/** Creates a form object. */
export function createForm(options: CreateAssistantOptions): Form;
export enum AssistantSubmitAction {
    BACK,
    CANCEL,
    FINISH,
    JUMP,
    NEXT,
}

export enum FieldBreakType {
    NONE,
    STARTCOL,
    STARTROW,
}

export enum FieldDisplayType {
    DISABLED,
    ENTRY,
    HIDDEN,
    INLINE,
    NORMAL,
    READONLY,
}

export enum FieldLayoutType {
    ENDROW,
    NORMAL,
    MIDROW,
    OUTSIDE,
    OUTSIDEBELOW,
    OUTSIDEABOVE,
    STARTROW,
}

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

export enum FormPageLinkType {
    BREADCRUMB,
    CROSSLINK,
}

export enum LayoutJustification {
    CENTER,
    LEFT,
    RIGHT,
}

export enum ListStyle {
    GRID,
    REPORT,
    PLAIN,
    NORMAL,
}

export enum SublistDisplayType {
    HIDDEN,
    NORMAL,
}

export enum SublistType {
    EDITOR,
    INLINEEDITOR,
    LIST,
    STATICLIST,
}
