import {BaseForm, Button, FieldType, LayoutJustification} from './ui/serverWidget';

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

//TODO: Complete function definitions
export interface Portlet extends BaseForm {
    addColumn(options: AddColumnOptions): any;
    addEditColumn(options: AddEditColumnOptions): any;
    addLine(): void;
    addRow(): void;
    addRows(): void;
    setSubmitButton(options: SetSubmitButtonOptions): Button;
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
