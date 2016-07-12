export interface MessageType {
    CONFIRMATION: string; // A green background with a checkmark icon.
    INFORMATION: string;  // A blue background with an Information icon.
    WARNING: string;      // A yellow background with a Warning icon.
    ERROR: string;        // A red background with an X icon.
}

export interface Message {
    hide(): void;
    show(options?: MessageShowOptions): void;
}

export interface MessageCreateOptions {
    message?: string;
    title?: string;
    type: string;
}

export interface MessageShowOptions {
    duration?: number;
}

export interface MessageModule {
    create(options: MessageCreateOptions): Message;
    Type: MessageType;
}

export default MessageModule;
