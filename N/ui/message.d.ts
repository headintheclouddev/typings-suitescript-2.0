interface Message {
    hide(): void;
    show(options?: MessageShowOptions): void;
}

interface MessageCreateOptions {
    message?: string;
    title?: string;
    type: Type;
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
