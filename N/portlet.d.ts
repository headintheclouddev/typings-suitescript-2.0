import {BaseForm, Button, Field, FieldType, LayoutJustification} from './ui/serverWidget';
import {Result} from './search';

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
}

interface AddFieldOptions {
    id:     string;
    label:  string;
    type:   string|FieldType;
    source: string;
}

interface AddLineOptions {
    text:   string;
    url?:   string;
    /** This value indicates the number of spaces to indent. */
    align?: number;
}

//TODO: Complete function definitions
export interface Portlet extends BaseForm {
    addColumn(options: AddColumnOptions): any;
    addEditColumn(options: AddEditColumnOptions): any;
    addField(options: AddFieldOptions): Field
    addLine(options: AddLineOptions): Object;
    addRow(row: Result|Object): Object;
    addRows(rows: Result[]|Object[]): Object;
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
