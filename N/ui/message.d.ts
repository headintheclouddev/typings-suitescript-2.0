/**
 * Use the N/ui/message module to display a message at the top of the screen under the menu bar.
 *
 * Supported script types: Client scripts. (To show a message from a server script, use serverWidget Form.addPageInitMessage(options).)
 */

/**
 * A message that can be displayed or hidden near the top of the page. Use message.create(options) to create this object.
 * @since 2016.1
 */
export interface Message { // Also referenced in N/ui/serverWidget
    /**
     * Hides the message.
     * @governance none
     * @since 2016.1
     */
    hide(): void;
    /**
     * Shows the message.
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.duration is specified with a non-numerical value or non-string value.
     * @governance none
     * @since 2016.1
     */
    show(options?: MessageShowOptions): void;
}

export interface MessageCreateOptions {
    /** The content of the message. The default value is an empty string. */
    message?: string;
    /** The message title. The default value is an empty string. */
    title?: string;
    /** The message type. Use the message.Type enum to set this value. */
    type: Type;
    /**
     * The amount of time, in milliseconds, to show the message. The default is 0, which shows the message until Message.hide() is called.
     * If you use a string, it is parsed to a number.
     * If you specify a duration for message.create() and message.show(), the value from the message.show() method call takes precedence.
     * @since 2018.2
     */
    duration?: number | string;
}

interface MessageShowOptions {
    /**
     * The amount of time, in milliseconds, to show the message. The default is 0, which shows the message until Message.hide() is called.
     * If you use a string, it is parsed to a number.
     * This value takes precedence over the duration set in message.create(options).
     */
    duration?: number | string;
}

/**
 * Creates a message that can be displayed or hidden near the top of the page.
 * @governance none
 * @since 2016.1
 */
export function create(options: MessageCreateOptions): Message;

/**
 * Holds the string values for the message types used in message.create(options).
 * @since 2016.1
 */
export enum Type {
    CONFIRMATION, // A green background with a checkmark icon.
    INFORMATION,  // A blue background with an Information icon.
    WARNING,      // A yellow background with a Warning icon.
    ERROR,        // A red background with an X icon.
}
