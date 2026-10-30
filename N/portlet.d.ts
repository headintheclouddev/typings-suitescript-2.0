import type {Button, Field, FieldType, LayoutJustification, ListColumn} from './ui/serverWidget';
import type {Result} from './search';

interface SetSubmitButtonOptions {
    /** The URL that the form posts data to. */
    url: string;
    /** The button label. */
    label?: string;
    /**
     * The target attribute of the form element, if it is different from the portlet's own embedded iframe.
     * Supported values include standard HTML target attributes such as _top, _parent, and _blank. It can also be set to frame names and the NetSuite-specific identifier _hidden.
     * Setting this value to _hidden allows submission to a backend that returns results to a hidden child iframe within the portlet's embedded iframe.
     */
    target?: string;
}

interface AddColumnOptions {
    /** The internal ID of this column. Keep the internal ID in lowercase and space-free. */
    id: string;
    /** The label of this column. */
    label: string;
    /** The field type for this column. Use values from serverWidget.FieldType. */
    type: string|FieldType;
    /** The layout justification for this column. Use values from serverWidget.LayoutJustification. */
    align?: string|LayoutJustification;
}

interface AddEditColumnOptions {
    /** The internal ID of the column to the left of which the Edit/View column is added. */
    column: string;
    /**
     * If set, it must contain a name of a column.
     * This column's value decides if the View/Edit link is clickable for a given data row (T=clickable, F=non-clickable).
     */
    showHrefCol?: string;
    /** If true, then an Edit/View column is added. Otherwise, only an Edit column is added. The default setting is false. */
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
    /**
     * The internal ID of the field.
     * Keep the internal ID in lowercase, space-free, and prefix it with custpage if you're adding it to an existing page.
     */
    id:      string;
    /** The label for this field. */
    label:   string;
    /** The field type for the field. Use values from serverWidget.FieldType. */
    type:    string|FieldType;
    /**
     * The internal ID or script ID of the source list for this field if it is a select (List/Record) or multi-select field.
     * For radio fields, the source parameter needs to include the field's internal ID.
     */
    source?: string;
}

interface AddLineOptions {
    /** The text for the line. */
    text:   string;
    /** The URL link. */
    url?:   string;
    /** The justification for the line. This value indicates the number of spaces to indent. Keep the align value between 0 and 5. */
    align?: number;
}

interface AddRowOptions {
    /** A row that consists of either a search.Result, or name/value pairs. Each pair should contain the value for the corresponding Column object in the list. */
    row: Result|Object;
}

interface AddRowsOptions {
    /** An array of rows that consist of either a search.Result array, or an array of name/value pairs. Each pair should contain the value for the corresponding Column object in the list. */
    rows: Result[]|Object[];
}

/**
 * Portlet objects are used to encapsulate scriptable dashboard portlets. NetSuite automatically passes them to the render(params) entry point.
 *
 * Which members apply depends on the portlet type:
 * - Simple Form portlets: addField, setSubmitButton, clientScriptFileId, clientScriptModulePath, title
 * - Inline HTML portlets: html, title
 * - Links and Indents portlets: addLine, title
 * - Simple List portlets: addColumn, addEditColumn, addRow, addRows, title
 * @since 2016.2
 */
export interface Portlet {
    /** Adds a list column to the portlet. (List portlets only) */
    addColumn(options: AddColumnOptions): ListColumn;
    /** Adds an Edit or Edit/View column to the portlet. (List portlets only) */
    addEditColumn(options: AddEditColumnOptions): ListColumn;
    /** Adds a field to the form. (Form portlets only) */
    addField(options: AddFieldOptions): Field;
    /** Adds a line to the portlet. (Links portlets only) */
    addLine(options: AddLineOptions): Object;
    /** Adds a row to the portlet. (List portlets only) */
    addRow(options: AddRowOptions): Object;
    /** Adds multiple rows to the portlet. (List portlets only) */
    addRows(options: AddRowsOptions): Object;
    /** Adds a submit button to the form. (Form portlets only) */
    setSubmitButton(options: SetSubmitButtonOptions): Button;
    /** The script file ID to be used in the portlet. Can be in either numerical or string format. (Form portlets only) */
    clientScriptFileId: number | string;
    /** The script path to be used in the portlet. (Form portlets only) */
    clientScriptModulePath: string;
    /** The complete HTML contents of the portlet. (HTML portlets only) */
    html: string;
    /** The title of the portlet. */
    title: string;
}

/**
 * Resizes a form portlet immediately.
 * Supported in client scripts.
 */
export function resize(): void;
/**
 * Refreshes a form portlet immediately.
 * Supported in client scripts.
 */
export function refresh(): void;
