/// <reference path="../../typings/tsd.d.ts" />

interface MessageType {
    CONFIRMATION: string; // A green background with a checkmark icon.
    INFORMATION: string;  // A blue background with an Information icon.
    WARNING: string;      // A yellow background with a Warning icon.
    ERROR: string;        // A red background with an X icon.
}

interface Message {
    hide(): void;
    show(options?: MessageShowOptions): void;
}

interface MessageCreateOptions {
    message?: string;
    title?: string;
    type: string;
}

interface MessageShowOptions {
    duration?: number;
}

interface message {
    create(options: MessageCreateOptions): Message;
    Type: MessageType;
}

declare module ui {
    var message: message;
}

declare module 'N/ui/message' {
    export = ui.message;
}
