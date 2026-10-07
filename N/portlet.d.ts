import type {BaseForm, Button, Field, FieldType, LayoutJustification, ListColumn} from './ui/serverWidget';
import type {Result} from './search';

/**
 * Use the N/portlet module to resize or refresh a form portlet.
 *
 * Supported script types: Client scripts (form portlets)
 */

interface SetSubmitButtonOptions {
    /** The URL that the form is submitted to. */
    url: string;
    /** The label for the submit button. */
    label?: string;
    /** The target attribute of the form element, if it is different from the portlet's own embedded iframe (for example, _top, _parent, _blank, a frame name, or the NetSuite-specific _hidden). */
    target?: string;
}

interface AddColumnOptions {
    /** The internal ID of the column. */
    id: string;
    /** The label for the column. */
    label: string;
    /** The field type for the column. Use the serverWidget.FieldType enum to set the value. */
    type: FieldType;
    /** The layout justification for the column. Use the serverWidget.LayoutJustification enum to set the value. */
    align?: LayoutJustification;
}

interface AddEditColumnOptions {
    /**
     * The column to the left of which the Edit/View column is added.
     * Oracle's Portlet.addEditColumn(options) page types this as a string (the column internal ID), while List.addEditColumn(options) types it as a serverWidget.ListColumn. Both forms are accepted here.
     */
    column: string | ListColumn;
    /**
     * Controls whether the Edit/View link is clickable.
     * Oracle's Portlet.addEditColumn(options) page types this as a string (the name of a column whose value, T or F, decides per row whether the link is clickable),
     * while List.addEditColumn(options) types it as a Boolean (true makes the link clickable). Both forms are accepted here.
     */
    showHrefCol?: boolean | string;
    /** If true, then an Edit/View column is added. Otherwise, only an Edit column is added. The default value is false. */
    showView?: boolean;
    /**
     * The Edit/View base link. (For example: /app/common/entity/employee.nl)
     * The complete link is formed like this: <link>?<linkParamName>=<row data from linkParam>. (For example: /app/common/entity/employee.nl?id=123)
     * @since 2019.2
     */
    link?: string;
    /**
     * The internal ID of the field in the row data where to take the parameter from.
     * The default value is the value set in the options.column parameter.
     * Tip: In most cases, the value to use here is internalid.
     * @since 2019.2
     */
    linkParam?: string;
    /**
     * The name of the parameter. The default value is id.
     * @since 2019.2
     */
    linkParamName?: string;
}

interface AddFieldOptions {
    /** The internal ID of the field. */
    id:      string;
    /** The label for the field. */
    label:   string;
    /** The field type. Use the serverWidget.FieldType enum to set the value. */
    type:    string|FieldType;
    /** The internal ID or script ID of the source list for this field if it is a select (List/Record) or multi-select field. For radio fields, the source parameter must contain the field's internal ID. */
    source?: string;
}

interface AddLineOptions {
    /** The text for the line. */
    text:   string;
    /** The URL link. */
    url?:   string;
    /** The number of spaces to indent the line (a value between 0 and 5). */
    align?: number;
}

interface AddRowOptions {
    /** A row that consists of either a search.Result, or name/value pairs. Each pair should contain the value for the corresponding Column object in the list. */
    row: Result|Record<string, any>;
}

interface AddRowsOptions {
    /** An array of rows that consist of either a search.Result array, or an array of name/value pairs. Each pair should contain the value for the corresponding Column object in the list. */
    rows: Result[]|Record<string, any>[];
}

/**
 * A portlet object, passed to the render(params) entry point of a Portlet script as params.portlet.
 * The members available depend on the portlet type (LIST, FORM, HTML, or LINKS).
 * @since 2016.2
 */
export interface Portlet extends Omit<BaseForm, 'clientScriptFileId'> {
    /**
     * Adds a list column to a LIST portlet.
     * @since 2016.2
     */
    addColumn(options: AddColumnOptions): ListColumn;
    /**
     * Adds an Edit or Edit/View column to a LIST portlet.
     * @since 2016.2
     */
    addEditColumn(options: AddEditColumnOptions): ListColumn;
    /**
     * Adds a field to a FORM portlet.
     * @since 2016.2
     */
    addField(options: AddFieldOptions): Field
    /**
     * Adds a line (containing text or simple HTML) with optional indenting and URL to a LINKS portlet.
     * @since 2016.2
     */
    addLine(options: AddLineOptions): object;
    /**
     * Adds a single row to a LIST portlet.
     * @since 2016.2
     */
    addRow(options: AddRowOptions): object;
    /**
     * Adds multiple rows to a LIST portlet.
     * @since 2016.2
     */
    addRows(options: AddRowsOptions): object;
    /**
     * Adds a submit button to a FORM portlet.
     * @since 2016.2
     */
    setSubmitButton(options: SetSubmitButtonOptions): Button;
    /**
     * The File Cabinet ID of the client script file to be used in a FORM portlet. Can be in either numerical or string format.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you try to set this value when Portlet.clientScriptModulePath is already set.
     * @since 2016.2
     */
    clientScriptFileId: number | string;
    /**
     * The relative path to the client script file to be used in a FORM portlet.
     * @throws {SuiteScriptError} PROPERTY_VALUE_CONFLICT if you try to set this value when Portlet.clientScriptFileId is already set.
     * @since 2016.2
     */
    clientScriptModulePath: string;
    /**
     * The complete HTML content of an HTML portlet.
     * @since 2016.2
     */
    html: string;
    /**
     * The portlet title.
     * @since 2016.2
     */
    title: string;
}

/**
 * Resizes a form portlet immediately.
 * @governance none
 * @since 2016.1
 */
export function resize(): void;
/**
 * Refreshes a form portlet immediately.
 * @governance none
 * @since 2016.1
 */
export function refresh(): void;
