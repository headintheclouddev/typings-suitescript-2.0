
interface AlertOptions {
    title?: string;
    message?: string;
}

interface CreateDialogOptions {
    buttons?: DialogButton[];
    title?: string;
    message?: string;
}

interface DialogButton {
    label: string;
    value: number | string;
}

/**
 * @governance none
 * @since 2016.1
 */
export function alert(options: AlertOptions): Promise<boolean>;
/**
 * @governance none
 * @since 2016.1
 */
export function confirm(options: AlertOptions): Promise<boolean>;
/**
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.buttons is specified and is not an array.
 * @throws {SuiteScriptError} BUTTONS_MUST_INCLUDE_BOTH_A_LABEL_AND_VALUE if options.buttons is specified and one or more items do not have a label, a value, or both.
 * @governance none
 * @since 2016.1
 */
export function create(options: CreateDialogOptions): Promise<string>;
