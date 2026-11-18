/** @since 2016.1 */
export interface Message { // Also referenced in N/ui/serverWidget
    /**
     * @governance none
     * @since 2016.1
     */
    hide(): void;
    /**
     * @throws {SuiteScriptError} WRONG_PARAMETER_TYPE if options.duration is specified with a non-numerical value or non-string value.
     * @governance none
     * @since 2016.1
     */
    show(options?: MessageShowOptions): void;
}

export interface MessageCreateOptions {
    message?: string;
    title?: string;
    type: Type;
    /**
     * The amount of time, in milliseconds, to show the message. The default is 0, which shows the message until Message.hide() is called.
     * If you specify a duration for message.create() and message.show(), the value from the message.show() method call takes precedence.
     * @since 2018.2
     */
    duration?: number;
}

interface MessageShowOptions {
    duration?: number;
}

/**
 * @governance none
 * @since 2016.1
 */
export function create(options: MessageCreateOptions): Message;
/** @since 2016.1 */
export enum Type {
    CONFIRMATION, // A green background with a checkmark icon.
    INFORMATION,  // A blue background with an Information icon.
    WARNING,      // A yellow background with a Warning icon.
    ERROR,        // A red background with an X icon.
}
