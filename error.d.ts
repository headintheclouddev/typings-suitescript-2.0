export interface SuiteScriptError {
    toString(): string;
    id: string;
    message: string;
    name: string;
    stack: string[];
}

export interface UserEventError {
    toString(): string;
    eventType: EventType;
    id: string;
    message: string;
    name: string;
    recordId: string;
    stack: string[];
}

export interface EventType {
    beforeLoad: string;
    beforeSubmit: string;
    afterSubmit: string;
}

export interface CreateOptions {
    name: string;
    message: string;
    notifyOff?: boolean;
}

export interface ErrorModule {
    /**
     * Encapsulates a SuiteScript error thrown by any script type that is not a user event script.
     */
    SuiteScriptError: SuiteScriptError;
    /**
     * Encapsulates a SuiteScript error thrown by a user event script.
     */
    UserEventError: UserEventError;
    /**
     * Creates a new error.SuiteScriptError or error.UserEventError object.
     */
    create(options: CreateOptions): SuiteScriptError | UserEventError;
}

export default ErrorModule;
