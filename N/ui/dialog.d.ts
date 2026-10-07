/**
 * Use the N/ui/dialog module to create a modal dialog that remains until a button on the dialog is pressed.
 *
 * Supported script types: Client scripts
 */

interface AlertOptions {
    /** The dialog title. The default value is an empty string. */
    title?: string;
    /** The content of the dialog box. The default value is an empty string. */
    message?: string;
}

interface CreateDialogOptions<B extends DialogButton<unknown> = DialogButton<string>> {
    /** A list of buttons to include in the dialog. Each item must be an object that contains a label and a value property. By default, a single button with the label OK and the value true is used. */
    buttons?: B[];
    /** The dialog title. The default value is an empty string. */
    title?: string;
    /** The content of the dialog box. The default value is an empty string. */
    message?: string;
}

interface DialogButton<V = number | string> {
    /** The label of the button. */
    label: string;
    /** The value returned (as the resolved Promise value) when the button is clicked. */
    value: V;
}

/**
 * Creates an Alert dialog with an OK button.
 * @returns A Promise that resolves to true when the user clicks OK.
 * @governance none
 * @since 2016.1
 */
export function alert(options: AlertOptions): Promise<boolean>;
/**
 * Creates a Confirm dialog with OK and Cancel buttons.
 * @returns A Promise that resolves to true if the user clicks OK, or false if the user clicks Cancel.
 * @governance none
 * @since 2016.1
 */
export function confirm(options: AlertOptions): Promise<boolean>;
/**
 * Creates a dialog with customized buttons.
 * @returns A Promise that resolves to the value of the button the user clicked. The resolved type is inferred from the button values (string when options.buttons is omitted, although the default OK button resolves to true).
 * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.buttons is specified and is not an array.
 * @throws {SuiteScriptError} BUTTONS_MUST_INCLUDE_BOTH_A_LABEL_AND_VALUE if options.buttons is specified and one or more items do not have a label, a value, or both.
 * @governance none
 * @since 2016.1
 */
export function create<B extends DialogButton<unknown> = DialogButton<string>>(options: CreateDialogOptions<B>): Promise<B['value']>;
