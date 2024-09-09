import { BaseForm, Button, Field, FieldType, LayoutJustification, ListColumn } from './ui/serverWidget';
import { Result } from './search';

interface SetSubmitButtonOptions {
    url: string;
    label?: string;
    target?: string;
}

interface AddColumnOptions {
    id: string;
    label: string;
    type: FieldType;
    align?: LayoutJustification;
}

interface AddEditColumnOptions {
    column: string;
    showHrefCol?: boolean;
    showView?: boolean;
    /**
     * The Edit/View base link. (For example: /app/common/entity/employee.nl)
     * The complete link is formed like this: <link>?<linkParamName>=<row data from linkParam>. (For example: /app/common/entity/employee.nl?id=123)
     */
    link?: string;
    /**
     * The internal ID of the field in the row data where to take the parameter from.
     * The default value is the value set in the options.column parameter.
     * Tip: In most cases, the value to use here is internalid.
     */
    linkParam?: string;
    /** The name of the parameter. The default value is id. */
    linkParamName?: string;
}

interface AddFieldOptions {
    id: string;
    label: string;
    type: string | FieldType;
    source?: string;
}

interface AddLineOptions {
    text: string;
    url?: string;
    /** This value indicates the number of spaces to indent. */
    align?: number;
}

interface AddRowOptions {
    /** A row that consists of either a search.Result, or name/value pairs. Each pair should contain the value for the corresponding Column object in the list. */
    row: Result | Object;
}

interface AddRowsOptions {
    /** An array of rows that consist of either a search.Result array, or an array of name/value pairs. Each pair should contain the value for the corresponding Column object in the list. */
    rows: Result[] | Object[];
}

//TODO: Complete function definitions
export interface Portlet extends BaseForm {
    addColumn(options: AddColumnOptions): ListColumn;
    addEditColumn(options: AddEditColumnOptions): ListColumn;
    addField(options: AddFieldOptions): Field;
    addLine(options: AddLineOptions): Object;
    addRow(options: AddRowOptions): Object;
    addRows(options: AddRowsOptions): Object;
    setSubmitButton(options: SetSubmitButtonOptions): Button;
    /** The script file ID to be used in the portlet. */
    clientScriptFileId: number;
    /** The script path to be used in the portlet. */
    clientScriptModulePath: string;
    html: string;
    title: string;
}

/**
 * Resizes a form portlet immediately.
 */
export function resize(): void;
/**
 * Refreshes a form portlet immediately.
 */
export function refresh(): void;
