interface Message {
    hide(): void;
    show(options?: MessageShowOptions): void;
}

export interface MessageCreateOptions {
    message?: string;
    title?: string;
    type: Type;
    /**
     * The amount of time, in milliseconds, to show the message. The default is 0, which shows the message until Message.hide() is called.
     * If you specify a duration for message.create() and message.show(), the value from the message.show() method call takes precedence.
     */
    duration?: number;
}

interface MessageShowOptions {
    duration?: number;
}

export function create(options: MessageCreateOptions): Message;
export enum Type {
    CONFIRMATION, // A green background with a checkmark icon.
    INFORMATION,  // A blue background with an Information icon.
    WARNING,      // A yellow background with a Warning icon.
    ERROR,        // A red background with an X icon.
}
